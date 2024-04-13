package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"schoolserver/model"
)

// version
func version() string {
	return "0.1"
}
func p(a ...interface{}) {
	fmt.Println(a)
}

type Configuration struct {
	Address      string
	ReadTimeout  int64
	WriteTimeout int64
	Static       string
}

var config Configuration
var logger *log.Logger

func init() {
	loadConfig()
	file, err := os.OpenFile("chitchat.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalln("Failed to open log file", err)
	}
	logger = log.New(file, "INFO ", log.Ldate|log.Ltime|log.Lshortfile)
}

func loadConfig() {
	file, err := os.Open("config.json")
	if err != nil {
		log.Fatalln("Cannot open config file", err)
	}
	decoder := json.NewDecoder(file)
	config = Configuration{}
	err = decoder.Decode(&config)
	if err != nil {
		log.Fatalln("Cannot get configuration from file", err)
	}
}

func generateJSONResponse(writer http.ResponseWriter, data interface{}, statusCode int) {
	writer.WriteHeader(statusCode)
	writer.Header().Set("Content-Type", "application/json")
	json.NewEncoder(writer).Encode(data)
}
func danger(args ...interface{}) {
	logger.SetPrefix("ERROR ")
	logger.Println(args...)
}

func session(writer http.ResponseWriter, request *http.Request) (sess model.Session, err error) {
	cookie, err := request.Cookie(COOKIE_SESSION)
	if err == nil {
		sess = model.Session{Uuid: cookie.Value}
		if ok, _ := sess.Check(); !ok {
			err = errors.New("invalid session")
		}
	}
	return
}

const (
	COOKIE_SESSION = "sesion"
)
