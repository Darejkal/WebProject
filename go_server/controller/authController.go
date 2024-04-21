package controller

import (
	"log"
	"net/http"
	"popman/model"
)

const authCookie = "_cookie"

// GET /login
// Show the login page
func Login(writer http.ResponseWriter, request *http.Request) {
	generateHTML(writer, nil, "login.layout", "public.navbar", "login")
}

// GET /signup
// Show the signup page
func Signup(writer http.ResponseWriter, request *http.Request) {
	generateHTML(writer, nil, "login.layout", "public.navbar", "signup")
}

// POST /signup
// Create the user account
func SignupAccount(writer http.ResponseWriter, request *http.Request) {
	err := request.ParseForm()
	if err != nil {
		danger(err, "Cannot parse form")
	}

	if _, err := model.CreateUser(
		request.PostFormValue("name"),
		request.PostFormValue("password"),
		request.PostFormValue("email"),
		request.PostFormValue("class"),
		request.PostFormValue("school"),
	); err != nil {
		danger(err, "Cannot create user")
	}
	http.Redirect(writer, request, "/login", 302)
}

// POST /authenticate
// Authenticate the user given the email and password
func Authenticate(writer http.ResponseWriter, request *http.Request) {
	err := request.ParseForm()
	if err != nil {
		danger(err, "Cannot parse form")
		http.Redirect(writer, request, "/error", http.StatusInternalServerError)
		return
	}
	user, err := model.UserByEmail(request.PostFormValue("email"))
	if err != nil {
		danger(err, "Cannot find user")
		http.Redirect(writer, request, "/error", http.StatusInternalServerError)
		return
	}
	if user.Password == request.PostFormValue("password") {
		session, err := user.CreateSession()
		if err != nil {
			danger(err, "Cannot create session")
			http.Redirect(writer, request, "/error", http.StatusInternalServerError)
			return
		}
		cookie := http.Cookie{
			Name:     authCookie,
			Value:    session.Uuid,
			HttpOnly: true,
		}
		http.SetCookie(writer, &cookie)
		log.Println("Login OK")
		http.Redirect(writer, request, "/", 302)
	} else {
		http.Redirect(writer, request, "/login", 302)
		log.Println("Login Not OK")
	}

}

// GET /logout
// Logs the user out
func Logout(writer http.ResponseWriter, request *http.Request) {
	cookie, err := request.Cookie(authCookie)
	if err == http.ErrNoCookie {
		warning(err, "Failed to get cookie")
	} else {
		session := model.Session{Uuid: cookie.Value}
		session.DeleteByUUID()
	}
	http.Redirect(writer, request, "/", 302)
}
