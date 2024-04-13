package main

import (
	"net/http"
	"time"
)

func main_setup() {
	p("ChitChat", version(), "started at", config.Address)

	// handle static assets
	mux := http.NewServeMux()
	files := http.FileServer(http.Dir(config.Static))
	mux.Handle("/static/", http.StripPrefix("/static/", files))

	// // defined in route_main.go
	mux.HandleFunc("/", index)

	// // defined in route_auth.go
	mux.HandleFunc("/signup", signupAccount)
	mux.HandleFunc("/authenticate", authenticate)

	// // defined in route_thread.go
	mux.HandleFunc("/thread/create", createThread)
	mux.HandleFunc("/thread/post", postThread)
	mux.HandleFunc("/thread/get", getThread)

	// // defined in route_thread.go
	mux.HandleFunc("/class/create", createClass)
	mux.HandleFunc("/class/update", updateClass)
	mux.HandleFunc("/class/get", getClass)

	// starting up the server
	server := &http.Server{
		Addr:           config.Address,
		Handler:        mux,
		ReadTimeout:    time.Duration(config.ReadTimeout * int64(time.Second)),
		WriteTimeout:   time.Duration(config.WriteTimeout * int64(time.Second)),
		MaxHeaderBytes: 1 << 20,
	}
	server.ListenAndServe()
}
func main() {
	main_setup()
}
