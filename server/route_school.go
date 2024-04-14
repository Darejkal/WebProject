package main

import (
	"net/http"
	"schoolserver/model"
)

// POST /school/create
// Create new school
func createSchool(writer http.ResponseWriter, request *http.Request) {
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
		school, err := model.CreateSchool(name)
		if err != nil {
			danger(err, "Cannot create school")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, school, http.StatusOK)
		// http.Redirect(writer, request, "/", 302)
	}
}

// GET /school/get
// Show the details of the school
func getSchool(writer http.ResponseWriter, request *http.Request) {
	_, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
		return
	}
	vals := request.URL.Query()
	uuid := vals.Get("id")
	school, err := model.SchoolByUUID(uuid)
	if err != nil {
		generateJSONResponse(writer, "Cannot get school", http.StatusInternalServerError)
	} else {
		_, err := session(writer, request)
		if err != nil {
			generateJSONResponse(writer, "", http.StatusForbidden)
		} else {
			generateJSONResponse(writer, school, http.StatusOK)
		}
	}
}

// POST /school/update
// Update the school
func updateSchool(writer http.ResponseWriter, request *http.Request) {
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
		school, err := model.SchoolByUUID(uuid)
		if err != nil {

			danger(err, "Cannot read school")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		school, err = school.Update(name)
		if err != nil {
			danger(err, "Cannot update school")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, school, http.StatusOK)
	}
}
