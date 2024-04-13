package main

import (
	"net/http"
	"schoolserver/model"
	"strconv"
)

// POST /signup
// Create the user account
func signupAccount(writer http.ResponseWriter, request *http.Request) {
	err := request.ParseForm()
	if err != nil {
		danger(err, "Cannot parse form")
		generateJSONResponse(writer, "", http.StatusInternalServerError)
		return
	}
	classid, err := strconv.Atoi(request.PostFormValue("classid"))
	if err != nil {
		danger(err, "Cannot parse form")
		generateJSONResponse(writer, "", http.StatusInternalServerError)
		return
	}
	schoolid, err := strconv.Atoi(request.PostFormValue("schoolid"))
	if err != nil {
		danger(err, "Cannot parse form")
		generateJSONResponse(writer, "", http.StatusInternalServerError)
		return
	}
	user := model.User{
		Name:     request.PostFormValue("name"),
		Email:    request.PostFormValue("email"),
		Password: request.PostFormValue("password"),
		ClassId:  classid,
		SchoolId: schoolid,
	}
	if err := user.Create(); err != nil {
		danger(err, "Cannot create user")
		generateJSONResponse(writer, "", http.StatusInternalServerError)
		return
	}
	generateJSONResponse(writer, "", http.StatusCreated)
}

// POST /authenticate
// Authenticate the user given the email and password
func authenticate(writer http.ResponseWriter, request *http.Request) {
	err := request.ParseForm()
	if err != nil {
		danger(err, "Authentication Form not OK")
	}
	user, err := model.UserByEmail(request.PostFormValue("email"))
	if err != nil {
		danger(err, "Cannot find user")
	}
	if user.Password == model.Encrypt(request.PostFormValue("password")) {
		session, err := user.CreateSession()
		if err != nil {
			danger(err, "Cannot create session")
		}
		cookie := http.Cookie{
			Name:     COOKIE_SESSION,
			Value:    session.Uuid,
			HttpOnly: true,
		}
		http.SetCookie(writer, &cookie)
		generateJSONResponse(writer, "", http.StatusOK)
	} else {
		generateJSONResponse(writer, "", http.StatusForbidden)
	}
}
