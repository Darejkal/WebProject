package router

import (
	"net/http"
	"popman/controller"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	files := http.FileServer(http.Dir(controller.Config.Static))
	router.Handle("/static/", http.StripPrefix("/static/", files))
	handleVideoSubRouter(router, "/call")
	return router
}
