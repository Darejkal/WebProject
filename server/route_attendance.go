package main

import (
	"net/http"
	"schoolserver/model"
)

func createAttendanceReport(writer http.ResponseWriter, request *http.Request) {
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
		attendanceReport, err := model.CreateAttendanceReport(name)
		if err != nil {
			danger(err, "Cannot create attendance report")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, attendanceReport, http.StatusOK)
	}
}
func getAttendanceReport(writer http.ResponseWriter, request *http.Request) {
	_, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
		return
	}
	vals := request.URL.Query()
	uuid := vals.Get("uuid")
	class, err := model.AttendanceReportByUUID(uuid)
	if err != nil {
		generateJSONResponse(writer, "Cannot get attendance report", http.StatusInternalServerError)
	} else {
		_, err := session(writer, request)
		if err != nil {
			generateJSONResponse(writer, "", http.StatusForbidden)
		} else {
			generateJSONResponse(writer, class, http.StatusOK)
		}
	}
}

func updateAttendanceReport(writer http.ResponseWriter, request *http.Request) {
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
		_, err = sess.User()
		if err != nil {
			danger(err, "Cannot get user from session")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		uuid := request.PostFormValue("uuid")
		name := request.PostFormValue("name")
		attendanceReport, err := model.AttendanceReportByUUID(uuid)
		if err != nil {
			danger(err, "Cannot read attendance report")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
		}
		attendanceReport, err = attendanceReport.Update(name)
		if err != nil {
			danger(err, "Cannot update attendance report")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, attendanceReport, http.StatusOK)
	}
}
func attendanceCheckin(writer http.ResponseWriter, request *http.Request) {
	sess, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
		return
	}
	_, err = sess.User()
	if err != nil {
		danger(err, "Cannot get user from session")
		generateJSONResponse(writer, "", http.StatusInternalServerError)
		return
	}
	userid := sess.UserId
	attendance_report_uuid := request.PostFormValue("attendance_report_uuid")
	attendanceReport, err := model.AttendanceReportByUUID(attendance_report_uuid)
	if err != nil {
		danger(err, "Cannot read attendance report")
		generateJSONResponse(writer, "", http.StatusInternalServerError)
	}
	studentAttendanceReportRelation, err := model.GetStudentAttendanceReportRelation(userid, attendanceReport.Id)
	if err != nil {
		studentAttendanceReportRelation, err = model.CreateStudentAttendanceReportRelation(userid, attendanceReport.Id, true)
		if err != nil {
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
	} else {
		studentAttendanceReportRelation.Update(true)
	}
	generateJSONResponse(writer, studentAttendanceReportRelation, http.StatusOK)
}
func attendanceUncheckin(writer http.ResponseWriter, request *http.Request) {
	sess, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
		return
	}
	_, err = sess.User()
	if err != nil {
		danger(err, "Cannot get user from session")
		generateJSONResponse(writer, "", http.StatusInternalServerError)
		return
	}
	userid := sess.UserId
	attendance_report_uuid := request.PostFormValue("attendance_report_uuid")
	attendanceReport, err := model.AttendanceReportByUUID(attendance_report_uuid)
	if err != nil {
		danger(err, "Cannot read attendance report")
		generateJSONResponse(writer, "", http.StatusInternalServerError)
	}
	studentAttendanceReportRelation, err := model.GetStudentAttendanceReportRelation(userid, attendanceReport.Id)
	if err != nil {
		studentAttendanceReportRelation, err = model.CreateStudentAttendanceReportRelation(userid, attendanceReport.Id, false)
		if err != nil {
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
	} else {
		studentAttendanceReportRelation.Update(false)
	}
	generateJSONResponse(writer, studentAttendanceReportRelation, http.StatusOK)

}
