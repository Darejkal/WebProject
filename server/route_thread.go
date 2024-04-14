package main

import (
	"net/http"
	"schoolserver/model"
)

// POST /thread/create
// Create new thread
func createThread(writer http.ResponseWriter, request *http.Request) {
	sess, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
	} else {
		err = request.ParseForm()
		if err != nil {
			danger(err, "Cannot parse form")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		user, err := sess.User()
		if err != nil {
			danger(err, "Cannot get user from session")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		topic := request.PostFormValue("topic")
		if _, err := user.CreateThread(topic); err != nil {
			danger(err, "Cannot create thread")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, "", http.StatusOK)
		// http.Redirect(writer, request, "/", 302)
	}
}

// GET /thread/get
// Show the details of the thread, including the posts and the form to write a post
func getThread(writer http.ResponseWriter, request *http.Request) {
	_, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
		return
	}
	vals := request.URL.Query()
	uuid := vals.Get("uuid")
	thread, err := model.ThreadByUUID(uuid)
	if err != nil {
		generateJSONResponse(writer, "Cannot read thread", http.StatusInternalServerError)
	} else {
		_, err := session(writer, request)
		if err != nil {
			generateJSONResponse(writer, "", http.StatusForbidden)
		} else {
			generateJSONResponse(writer, thread, http.StatusOK)
		}
	}
}

// POST /thread/post
// Create the post
func postThread(writer http.ResponseWriter, request *http.Request) {
	sess, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
	} else {
		err = request.ParseForm()
		if err != nil {
			danger(err, "Cannot parse form")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		user, err := sess.User()
		if err != nil {
			danger(err, "Cannot get user from session")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		body := request.PostFormValue("body")
		uuid := request.PostFormValue("uuid")
		thread, err := model.ThreadByUUID(uuid)
		if err != nil {

			danger(err, "Cannot read thread")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
		}
		if _, err := user.CreatePost(thread, body); err != nil {
			danger(err, "Cannot create post")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, thread, http.StatusOK)
	}
}
