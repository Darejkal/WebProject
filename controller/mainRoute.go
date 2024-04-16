package controller

import (
	"net/http"
)

// GET /err?msg=
// shows the error message page
func Err(writer http.ResponseWriter, request *http.Request) {
	vals := request.URL.Query()
	_, err := session(writer, request)
	if err != nil {
		generateHTML(writer, vals.Get("msg"), "layout", "public.navbar", "error")
	} else {
		generateHTML(writer, vals.Get("msg"), "layout", "private.navbar", "error")
	}
}

// GET /
func Index(writer http.ResponseWriter, request *http.Request) {
	// threads, err := model.Threads()
	// if err != nil {
	// 	error_message(writer, request, "Cannot get threads")
	// } else {
	_, err := session(writer, request)
	if err != nil {
		generateHTML(writer, nil, "layout", "public.navbar", "index")
	} else {
		generateHTML(writer, nil, "layout", "private.navbar", "index")
	}
	// }

}
