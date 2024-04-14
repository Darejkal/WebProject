package main

import (
	"net/http"
	"schoolserver/model"
)

// POST /class/create
// Create new class
func createClass(writer http.ResponseWriter, request *http.Request) {
	_, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
	} else {
		err = request.ParseForm()
		if err != nil {
			danger(err, "Cannot parse form")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		name := request.PostFormValue("name")
		abbrev := request.PostFormValue("abbrev")
		class, err := model.CreateClass(name, abbrev)
		if err != nil {
			danger(err, "Cannot create class")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, class, http.StatusOK)
		// http.Redirect(writer, request, "/", 302)
	}
}

// GET /class/get
// Show the details of the class
func getClass(writer http.ResponseWriter, request *http.Request) {
	_, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
		return
	}
	vals := request.URL.Query()
	uuid := vals.Get("uuid")
	class, err := model.ClassByUUID(uuid)
	if err != nil {
		generateJSONResponse(writer, "Cannot get Class", http.StatusInternalServerError)
	} else {
		_, err := session(writer, request)
		if err != nil {
			generateJSONResponse(writer, "", http.StatusForbidden)
		} else {
			generateJSONResponse(writer, class, http.StatusOK)
		}
	}
}

// POST /class/update
// Update the class
func updateClass(writer http.ResponseWriter, request *http.Request) {
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
		_, err := sess.User()
		if err != nil {
			danger(err, "Cannot get user from session")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		uuid := request.PostFormValue("uuid")
		name := request.PostFormValue("name")
		abbrev := request.PostFormValue("abbrev")
		class, err := model.ClassByUUID(uuid)
		if err != nil {

			danger(err, "Cannot read class")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
		}
		class, err = class.Update(name, abbrev)
		if err != nil {
			danger(err, "Cannot update class")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, class, http.StatusOK)
	}
}
