package router

import (
	"popman/controller"

	"github.com/gorilla/mux"
)

func handleVideoSubRouter(router *mux.Router, prefix string) {
	subrouter := router.PathPrefix(prefix).Subrouter()

	subrouter.HandleFunc("/websocket/{roomid}", controller.WebsocketHandler).Methods("GET")

	subrouter.HandleFunc("/", controller.GetCallIndexPage).Methods("GET")
	subrouter.HandleFunc("/{roomid}", controller.GetCallIndexPage).Methods("GET")

}
