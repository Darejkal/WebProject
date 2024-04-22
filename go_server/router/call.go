package router

import (
	"popman/controller"
	"text/template"

	"github.com/gorilla/mux"
)

var (
	indexTemplate = &template.Template{}
)

func handleVideoSubRouter(router *mux.Router, prefix string) {
	subrouter := router.PathPrefix(prefix).Subrouter()

	subrouter.HandleFunc("/websocket/", controller.WebsocketHandler).Methods("GET")

	subrouter.HandleFunc("/", controller.GetCallIndexPage).Methods("GET")

}
