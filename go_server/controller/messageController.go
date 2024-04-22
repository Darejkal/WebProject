package controller

import (
	"net/http"
	"popman/model"
)

func GetMessagePage(writer http.ResponseWriter, request *http.Request) {
	vals := request.URL.Query()
	uuid := vals.Get("id")
	thread, err := model.ChatThreadByUUID(uuid)
	if err != nil {
		error_message(writer, request, "Cannot read thread")
	} else {
		_, err := session(writer, request)
		if err != nil {
			generateHTML(writer, thread, "layout", "public.navbar", "public.thread")
		} else {
			generateHTML(writer, thread, "layout", "private.navbar", "private.thread")
		}
	}
}
