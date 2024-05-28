package router

import (
	"log"
	"net/http"
	"popman/controller"

	"github.com/gorilla/mux"
)

func PublicCorsMiddleWare(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		log.Println("call api called")
		h.ServeHTTP(w, r)
	})
}
func handleVideoSubRouter(router *mux.Router, prefix string) {
	subrouter := router.PathPrefix(prefix).Subrouter()
	subrouter.Use(PublicCorsMiddleWare)
	// subrouter.Header().Add("Access-Control-Allow-Origin", "*")
	subrouter.HandleFunc("/websocket/{roomid}", controller.WebsocketHandler).Methods("GET")

	subrouter.HandleFunc("/api/getroom/", controller.APIGetCallIndex).Methods("GET")
	subrouter.HandleFunc("/", controller.GetCallIndexPage).Methods("GET")
	subrouter.HandleFunc("/{roomid}", controller.GetCallIndexPage).Methods("GET")

}
