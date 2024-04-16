package main

import (
	"net/http"
	"time"
)

func main_setup() {
	p("HustServe", version(), "started at", config.Address)

	// handle static assets
	mux := http.NewServeMux()
	files := http.FileServer(http.Dir(config.Static))
	mux.Handle("/static/", http.StripPrefix("/static/", files))

	// // defined in route_main.go
	mux.HandleFunc("/", index)

	// // defined in route_auth.go
	mux.HandleFunc("/signup", signupAccount)
	mux.HandleFunc("/authenticate", authenticate)

	// // defined in route_thread.go
	mux.HandleFunc("/thread/create", createThread)
	mux.HandleFunc("/thread/post", postThread)
	mux.HandleFunc("/thread/get", getThread)

	// // defined in route_class.go
	mux.HandleFunc("/class/create", createClass)
	mux.HandleFunc("/class/update", updateClass)
	mux.HandleFunc("/class/get", getClass)

	// // defined in route_school.go
	mux.HandleFunc("/school/create", createSchool)
	mux.HandleFunc("/school/update", updateSchool)
	mux.HandleFunc("/school/get", getSchool)

	// // defined in route_exam.go
	mux.HandleFunc("/exam/create", createExam)
	mux.HandleFunc("/exam/update", updateExam)
	mux.HandleFunc("/exam/get", getExam)
	mux.HandleFunc("/exam/createinstance", createExamInstance)
	mux.HandleFunc("/exam/updateinstance", updateExamInstance)
	mux.HandleFunc("/exam/getinstance", getExamInstance)
	mux.HandleFunc("/exam/answer/submit", answerExamQuestion)

	// // defined in route_attendance.go
	mux.HandleFunc("/attendance/create", createAttendanceReport)
	mux.HandleFunc("/attendance/update", updateAttendanceReport)
	mux.HandleFunc("/attendance/get", getAttendanceReport)
	mux.HandleFunc("/attendance/checkin", attendanceCheckin)
	mux.HandleFunc("/attendance/uncheckin", attendanceUncheckin)
	// starting up the server
	server := &http.Server{
		Addr:           config.Address,
		Handler:        mux,
		ReadTimeout:    time.Duration(config.ReadTimeout * int64(time.Second)),
		WriteTimeout:   time.Duration(config.WriteTimeout * int64(time.Second)),
		MaxHeaderBytes: 1 << 20,
	}
	server.ListenAndServe()
}
func main() {
	main_setup()
}
