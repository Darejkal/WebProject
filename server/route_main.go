package main

import "net/http"

func index(writer http.ResponseWriter, request *http.Request) {
	generateJSONResponse(writer, "Up and running", 200)
}
