package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"popman/controller"
	"popman/router"
)

func main() {
	fmt.Println("MongoDB API")
	router := router.Router()
	fmt.Println("Server is getting started...")
	fmt.Printf("Listening at port %s ...\n", controller.Config.Address)
	server := &http.Server{
		Addr:           controller.Config.Address,
		Handler:        router,
		ReadTimeout:    time.Duration(controller.Config.ReadTimeout * int64(time.Second)),
		WriteTimeout:   time.Duration(controller.Config.WriteTimeout * int64(time.Second)),
		MaxHeaderBytes: 1 << 20,
	}
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
