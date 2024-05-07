package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/pion/rtcp"
	"github.com/pion/webrtc/v3"
)

type peerConnectionState struct {
	peerConnection *webrtc.PeerConnection
	websocket      *threadSafeWriter
}
type websocketMessage struct {
	Event string `json:"event"`
	Data  string `json:"data"`
}

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool { return true },
	}
	listLocks       map[string]*sync.RWMutex
	peerConnections map[string]*[]peerConnectionState
	trackLocals     map[string]*webrtc.TrackLocalStaticRTP
)

// Add to list of tracks and fire renegotation for all PeerConnections
func addTrack(t *webrtc.TrackRemote, roomid string) *webrtc.TrackLocalStaticRTP {
	listLocks[roomid].Lock()
	defer func() {
		listLocks[roomid].Unlock()
		signalPeerConnections(roomid)
	}()

	// Create a new TrackLocal with the same codec as our incoming
	trackLocal, err := webrtc.NewTrackLocalStaticRTP(t.Codec().RTPCodecCapability, t.ID(), t.StreamID())
	if err != nil {
		panic(err)
	}

	trackLocals[t.ID()] = trackLocal
	return trackLocal
}

// Remove from list of tracks and fire renegotation for all PeerConnections
func removeTrack(t *webrtc.TrackLocalStaticRTP, roomid string) {
	listLocks[roomid].Lock()
	defer func() {
		listLocks[roomid].Unlock()
		signalPeerConnections(roomid)
	}()

	delete(trackLocals, t.ID())
}

// signalPeerConnections updates each PeerConnection so that it is getting all the expected media tracks
func signalPeerConnections(roomid string) {
	listLock, ok := listLocks[roomid]
	if !ok {
		log.Fatalf("lock not found for room %s", roomid)
	}
	peerConnRoom, ok := peerConnections[roomid]
	if !ok {
		log.Fatalf("peerroom not found for room %s", roomid)
	}
	listLock.Lock()
	defer func() {
		listLock.Unlock()
		// why?
		dispatchKeyFrame(roomid)
	}()

	attemptSync := func() (tryAgain bool) {
		for i := range *peerConnRoom {
			if (*peerConnRoom)[i].peerConnection.ConnectionState() == webrtc.PeerConnectionStateClosed {
				*peerConnRoom = append((*peerConnRoom)[:i], (*peerConnRoom)[i+1:]...)
				return true // We modified the slice, start from the beginning
			}

			// map of sender we already are sending, so we don't double send
			existingSenders := map[string]bool{}

			for _, sender := range (*peerConnRoom)[i].peerConnection.GetSenders() {
				if sender.Track() == nil {
					continue
				}

				existingSenders[sender.Track().ID()] = true

				// If we have a RTPSender that doesn't map to a existing track remove and signal
				if _, ok := trackLocals[sender.Track().ID()]; !ok {
					if err := (*peerConnRoom)[i].peerConnection.RemoveTrack(sender); err != nil {
						return true
					}
				}
			}

			// Don't receive videos we are sending, make sure we don't have loopback
			for _, receiver := range (*peerConnRoom)[i].peerConnection.GetReceivers() {
				if receiver.Track() == nil {
					continue
				}

				existingSenders[receiver.Track().ID()] = true
			}

			// Add all track we aren't sending yet to the PeerConnection
			for trackID := range trackLocals {
				if _, ok := existingSenders[trackID]; !ok {
					if _, err := (*peerConnRoom)[i].peerConnection.AddTrack(trackLocals[trackID]); err != nil {
						return true
					}
				}
			}

			offer, err := (*peerConnRoom)[i].peerConnection.CreateOffer(nil)
			if err != nil {
				return true
			}

			if err = (*peerConnRoom)[i].peerConnection.SetLocalDescription(offer); err != nil {
				return true
			}

			offerString, err := json.Marshal(offer)
			if err != nil {
				return true
			}
			if err = (*peerConnRoom)[i].websocket.WriteJSON(&websocketMessage{
				Event: "offer",
				Data:  string(offerString),
			}); err != nil {
				return true
			}
		}

		return
	}

	for syncAttempt := 0; ; syncAttempt++ {
		if syncAttempt == 25 {
			// Release the lock and attempt a sync in 3 seconds. We might be blocking a RemoveTrack or AddTrack
			go func() {
				time.Sleep(time.Second * 3)
				signalPeerConnections(roomid)
			}()
			return
		}

		if !attemptSync() {
			break
		}
	}
}

// dispatchKeyFrame sends a keyframe to all PeerConnections, used everytime a new user joins the call
func dispatchKeyFrame(roomid string) error {
	listLock, ok := listLocks[roomid]
	if !ok {
		return fmt.Errorf("list lock not found for room %s", roomid)

	}
	peerConnRoom, ok := peerConnections[roomid]
	if !ok {
		return fmt.Errorf("peerroom not found for room %s", roomid)
	}
	listLock.Lock()
	defer listLock.Unlock()
	for i := range *peerConnRoom {
		for _, receiver := range (*peerConnRoom)[i].peerConnection.GetReceivers() {
			if receiver.Track() == nil {
				log.Default().Printf("notrack on receiver no %d", i)
				continue
			}
			log.Println("sending keyframe")
			_ = (*peerConnRoom)[i].peerConnection.WriteRTCP([]rtcp.Packet{
				&rtcp.PictureLossIndication{
					MediaSSRC: uint32(receiver.Track().SSRC()),
				},
			})
		}
	}
	return nil
}
func init() {
	trackLocals = map[string]*webrtc.TrackLocalStaticRTP{}
}

// Handle incoming websockets
func WebsocketHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	roomid := vars["roomid"]
	var peerConnRoom *[]peerConnectionState
	val, ok := peerConnections[roomid]
	if ok {
		peerConnRoom = val
	} else {
		peerConnRoom = new([]peerConnectionState)
		peerConnections[roomid] = peerConnRoom
	}
	defer func() {
		// the connection should be removed by onstatechangeevent after connection's closed in defer
		if len((*peerConnRoom)) == 0 {
			delete(peerConnections, roomid)
			delete(listLocks, roomid)
		}
	}()
	listLock, ok := listLocks[roomid]
	if !ok {
		listLock = new(sync.RWMutex)
		listLocks["roomid"] = listLock
		go func() {
			for range time.NewTicker(time.Second * 3).C {
				err := dispatchKeyFrame(roomid)
				if err != nil {
					break
				}
			}
		}()
	}

	log.Println("received websocket connection.")

	// Upgrade HTTP request to Websocket
	unsafeConn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}

	ws := &threadSafeWriter{unsafeConn, sync.Mutex{}}

	// When this frame returns close the Websocket
	defer ws.Close() //nolint

	// Create new PeerConnection
	peerConnection, err := webrtc.NewPeerConnection(webrtc.Configuration{})
	if err != nil {
		log.Print(err)
		return
	}

	// When this frame returns close the PeerConnection
	defer peerConnection.Close() //nolint

	// Accept one audio and one video track incoming
	for _, typ := range []webrtc.RTPCodecType{webrtc.RTPCodecTypeVideo, webrtc.RTPCodecTypeAudio} {
		if _, err := peerConnection.AddTransceiverFromKind(typ, webrtc.RTPTransceiverInit{
			Direction: webrtc.RTPTransceiverDirectionRecvonly,
		}); err != nil {
			log.Print(err)
			return
		}
	}

	// Add our new PeerConnection to global list
	listLock.Lock()
	*peerConnRoom = append(*peerConnRoom, peerConnectionState{peerConnection, ws})
	listLock.Unlock()

	// Trickle ICE. Emit server candidate to client
	peerConnection.OnICECandidate(func(i *webrtc.ICECandidate) {
		if i == nil {
			return
		}

		candidateString, err := json.Marshal(i.ToJSON())
		if err != nil {
			log.Println(err)
			return
		}

		if writeErr := ws.WriteJSON(&websocketMessage{
			Event: "candidate",
			Data:  string(candidateString),
		}); writeErr != nil {
			log.Println(writeErr)
		}
	})

	// If PeerConnection is closed remove it from the room
	// This will also be called without the need for defer to update the peerroom.
	peerConnection.OnConnectionStateChange(func(p webrtc.PeerConnectionState) {
		switch p {
		case webrtc.PeerConnectionStateFailed:
			if err := peerConnection.Close(); err != nil {
				log.Print(err)
			}
		case webrtc.PeerConnectionStateClosed:
			signalPeerConnections(roomid)
		default:
		}
	})

	peerConnection.OnTrack(func(t *webrtc.TrackRemote, _ *webrtc.RTPReceiver) {
		// Create a track to fan out our incoming video to all peers
		trackLocal := addTrack(t, roomid)
		defer removeTrack(trackLocal, roomid)

		buf := make([]byte, 1500)
		for {
			i, _, err := t.Read(buf)
			if err != nil {
				return
			}

			if _, err = trackLocal.Write(buf[:i]); err != nil {
				return
			}
		}
	})

	// Signal for the new PeerConnection
	signalPeerConnections(roomid)

	message := &websocketMessage{}
	for {
		_, raw, err := ws.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		} else if err := json.Unmarshal(raw, &message); err != nil {
			log.Println(err)
			return
		}

		switch message.Event {
		case "candidate":
			candidate := webrtc.ICECandidateInit{}
			if err := json.Unmarshal([]byte(message.Data), &candidate); err != nil {
				log.Println(err)
				return
			}

			if err := peerConnection.AddICECandidate(candidate); err != nil {
				log.Println(err)
				return
			}
		case "answer":
			answer := webrtc.SessionDescription{}
			if err := json.Unmarshal([]byte(message.Data), &answer); err != nil {
				log.Println(err)
				return
			}

			if err := peerConnection.SetRemoteDescription(answer); err != nil {
				log.Println(err)
				return
			}
		}
	}
}
func GetCallIndexPage(writer http.ResponseWriter, response *http.Request) {
	vars := mux.Vars()
	roomid, ok := vars["roomid"]
	if ok {
		generateHTMLPage(writer, nil, "call_index")
	} else {
		http.Redirect(writer, response, "/", http.StatusSeeOther)
	}
}

// Helper to make Gorilla Websockets threadsafe
type threadSafeWriter struct {
	*websocket.Conn
	sync.Mutex
}

func (t *threadSafeWriter) WriteJSON(v interface{}) error {
	t.Lock()
	defer t.Unlock()

	return t.Conn.WriteJSON(v)
}
