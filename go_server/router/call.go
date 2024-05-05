package router

import (
	"popman/controller"

	"github.com/gorilla/mux"
)

func handleVideoSubRouter(router *mux.Router, prefix string) {
	subrouter := router.PathPrefix(prefix).Subrouter()

	subrouter.HandleFunc("/websocket/", controller.WebsocketHandler).Methods("GET")

	subrouter.HandleFunc("/", controller.GetCallIndexPage).Methods("GET")

}
