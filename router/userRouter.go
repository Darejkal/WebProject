package router

import (
	"net/http"
	"popman/controller"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	files := http.FileServer(http.Dir(controller.Config.Static))
	// router.Handle("/static/", http.StripPrefix("/static/", files))
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", files))

	router.HandleFunc("/", controller.Index).Methods("GET")
	// error
	router.HandleFunc("/error", controller.Err).Methods("GET")

	// defined in route_auth.go
	router.HandleFunc("/login", controller.Login).Methods("GET")
	router.HandleFunc("/logout", controller.Logout).Methods("GET")
	router.HandleFunc("/signup", controller.Signup).Methods("GET")
	router.HandleFunc("/signup_account", controller.SignupAccount).Methods("POST")
	router.HandleFunc("/authenticate", controller.Authenticate).Methods("POST")

	router.HandleFunc("/login", controller.Login).Methods("GET")
	router.HandleFunc("/logout", controller.Logout).Methods("GET")
	router.HandleFunc("/signup", controller.Signup).Methods("GET")
	router.HandleFunc("/signup_account", controller.SignupAccount).Methods("POST")
	router.HandleFunc("/authenticate", controller.Authenticate).Methods("POST")

	router.HandleFunc("/thread/new", controller.NewChatThread).Methods("GET")
	router.HandleFunc("/thread/create", controller.CreateChatThread).Methods("POST")
	router.HandleFunc("/thread/post", controller.PostChatThread).Methods("POST")
	router.HandleFunc("/thread/read", controller.ReadChatThread).Methods("GET")
	return router
}
