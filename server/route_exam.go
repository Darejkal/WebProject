package main

import (
	"net/http"
	"schoolserver/model"
	"strconv"
)

func createExam(writer http.ResponseWriter, request *http.Request) {
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
		author_id, err := strconv.Atoi(request.PostFormValue("exam_id"))
		if err != nil {
			danger(err, "Cannot read form")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		exam_type := request.PostFormValue("exam_type")

		class, err := model.CreateExam(name, author_id, exam_type)
		if err != nil {
			danger(err, "Cannot create class")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, class, http.StatusOK)
		// http.Redirect(writer, request, "/", 302)
	}
}

// updateExamHandler handles the update of an exam instance.
func updateExam(writer http.ResponseWriter, request *http.Request) {
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
		uuid := request.PostFormValue("uuid")
		name := request.PostFormValue("name")
		authorid, err := strconv.Atoi(request.PostFormValue("authorid"))
		if err != nil {
			danger(err, "Cannot read form")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		exam_type := request.PostFormValue("exam_type")
		exam, err := model.ExamByUUID(uuid)
		if err != nil {

			danger(err, "Cannot read exam")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
		}
		updated_exam, err := exam.Update(name, authorid, exam_type)
		if err != nil {
			danger(err, "Cannot update exam")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, updated_exam, http.StatusOK)
	}
}

// getExamHandler handles the retrieval of an exam instance by ID.
func getExam(writer http.ResponseWriter, request *http.Request) {
	_, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
		return
	}
	vals := request.URL.Query()
	uuid := vals.Get("uuid")
	Exam, err := model.ExamByUUID(uuid)
	if err != nil {
		generateJSONResponse(writer, "Cannot get exam", http.StatusInternalServerError)
	} else {
		_, err := session(writer, request)
		if err != nil {
			generateJSONResponse(writer, "", http.StatusForbidden)
		} else {
			generateJSONResponse(writer, Exam, http.StatusOK)
		}
	}
}
func createExamInstance(writer http.ResponseWriter, request *http.Request) {
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
		subject_instance_id, err := strconv.Atoi(request.PostFormValue("subject_instance_id"))
		if err != nil {
			danger(err, "Cannot read form")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		exam_id, err := strconv.Atoi(request.PostFormValue("exam_id"))
		if err != nil {
			danger(err, "Cannot read form")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		class, err := model.CreateExamInstance(subject_instance_id, exam_id)
		if err != nil {
			danger(err, "Cannot create exam instance")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, class, http.StatusOK)
		// http.Redirect(writer, request, "/", 302)
	}
}

// updateExamInstanceHandler handles the update of an exam instance.
func updateExamInstance(writer http.ResponseWriter, request *http.Request) {
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
		uuid := request.PostFormValue("uuid")
		subject_instance_id, err := strconv.Atoi(request.PostFormValue("subject_instance_id"))
		if err != nil {
			danger(err, "Cannot read form")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		exam_id, err := strconv.Atoi(request.PostFormValue("exam_id"))
		if err != nil {
			danger(err, "Cannot read form")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		examInstance, err := model.ExamInstanceByUUID(uuid)
		if err != nil {

			danger(err, "Cannot read exam instance")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
		}
		examInstance, err = examInstance.Update(subject_instance_id, exam_id)
		if err != nil {
			danger(err, "Cannot update exam instance")
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
		generateJSONResponse(writer, examInstance, http.StatusOK)
	}
}

// getExamInstanceHandler handles the retrieval of an exam instance by ID.
func getExamInstance(writer http.ResponseWriter, request *http.Request) {
	_, err := session(writer, request)
	if err != nil {
		generateJSONResponse(writer, "", http.StatusForbidden)
		return
	}
	vals := request.URL.Query()
	uuid := vals.Get("uuid")
	examInstance, err := model.ExamByUUID(uuid)
	if err != nil {
		generateJSONResponse(writer, "Cannot get exam instance", http.StatusInternalServerError)
	} else {
		_, err := session(writer, request)
		if err != nil {
			generateJSONResponse(writer, "", http.StatusForbidden)
		} else {
			generateJSONResponse(writer, examInstance, http.StatusOK)
		}
	}
}

func answerExamQuestion(writer http.ResponseWriter, request *http.Request) {
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
	question_id, err := strconv.Atoi(request.PostFormValue("question_id"))
	if err != nil {
		danger(err, "Cannot read form value question_id")
		generateJSONResponse(writer, "", http.StatusInternalServerError)
		return
	}
	chosen_answer_id, err := strconv.Atoi(request.PostFormValue("chosen_answer_id"))
	if err != nil {
		danger(err, "Cannot read form value chosen_answer_id")
		generateJSONResponse(writer, "", http.StatusInternalServerError)
		return
	}
	studentAttendanceReportRelation, err := model.GetExamItemStudentRelation(userid, question_id)
	if err != nil {
		studentAttendanceReportRelation, err = model.CreateExamItemStudentRelation(userid, question_id, chosen_answer_id)
		if err != nil {
			generateJSONResponse(writer, "", http.StatusInternalServerError)
			return
		}
	} else {
		studentAttendanceReportRelation.Update(chosen_answer_id)
	}
	generateJSONResponse(writer, studentAttendanceReportRelation, http.StatusOK)
}
