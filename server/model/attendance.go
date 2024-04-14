package model

import (
	"context"
	"time"
)

// CreateAttendanceReport creates a new attendance record in the database.
func CreateAttendanceReport(name string) (attendance AttendanceReport, err error) {
	statement := "INSERT INTO attendance_reports (uuid, name, created_at) VALUES ($1, $2, $3) RETURNING id, uuid, name, created_at"
	err = dbpool.QueryRow(context.Background(), statement, createUUID(), name, time.Now()).Scan(&attendance.Id, &attendance.Uuid, &attendance.Name, &attendance.CreatedAt)
	return
}

// UpdateAttendanceReport updates the name of an existing attendance record in the database.
func (attendance *AttendanceReport) Update(name string) (updatedAttendanceReport AttendanceReport, err error) {
	statement := "UPDATE attendance_reports SET name=$1 WHERE uuid=$2"
	err = dbpool.QueryRow(context.Background(), statement, name, attendance.Uuid).Scan(&updatedAttendanceReport.Id, &updatedAttendanceReport.Uuid, &updatedAttendanceReport.Name, &updatedAttendanceReport.CreatedAt)
	return
}

// GetAttendanceReportByUUID retrieves an attendance record from the database based on its UUID.
func AttendanceReportByUUID(uuid string) (attendance AttendanceReport, err error) {
	attendance = AttendanceReport{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, name, created_at FROM attendance_reports WHERE uuid = $1", uuid).
		Scan(&attendance.Id, &attendance.Uuid, &attendance.Name, &attendance.CreatedAt)
	return
}

// DeleteAttendanceReport deletes an attendance record from the database.
func (attendance *AttendanceReport) Delete() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM attendance_reports WHERE uuid = $1", attendance.Uuid)
	return
}

// CreateStudentAttendanceReportRelation creates a new student attendance report relation record in the database.
func CreateStudentAttendanceReportRelation(userId, attendanceReportId int, isAttended bool) (relation StudentAttendanceReportRelation, err error) {
	statement := "INSERT INTO student_attendance_report_relations (user_id, attendance_report_id, is_attended, created_at) VALUES ($1, $2, $3, $4) RETURNING id, user_id, attendance_report_id, is_attended, created_at"
	err = dbpool.QueryRow(context.Background(), statement, userId, attendanceReportId, isAttended, time.Now()).Scan(&relation.Id, &relation.UserId, &relation.AttendanceReportId, &relation.IsAttended, &relation.CreatedAt)
	return
}

// Update updates the attendance status of a student in a specific attendance report.
func (relation *StudentAttendanceReportRelation) Update(isAttended bool) (updatedRelation StudentAttendanceReportRelation, err error) {
	statement := "UPDATE student_attendance_report_relations SET is_attended=$1 WHERE id=$2 RETURNING id, user_id, attendance_report_id, is_attended, created_at"
	err = dbpool.QueryRow(context.Background(), statement, isAttended, relation.Id).Scan(&updatedRelation.Id, &updatedRelation.UserId, &updatedRelation.AttendanceReportId, &updatedRelation.IsAttended, &updatedRelation.CreatedAt)
	return
}

// GetStudentAttendanceReportRelationByID retrieves a student attendance report relation record from the database based on its ID.
func StudentAttendanceReportRelationByID(id int) (relation StudentAttendanceReportRelation, err error) {
	relation = StudentAttendanceReportRelation{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, user_id, attendance_report_id, is_attended, created_at FROM student_attendance_report_relations WHERE id = $1", id).
		Scan(&relation.Id, &relation.UserId, &relation.AttendanceReportId, &relation.IsAttended, &relation.CreatedAt)
	return
}
func GetStudentAttendanceReportRelation(user_id int, attendance_report_id int) (relation StudentAttendanceReportRelation, err error) {
	relation = StudentAttendanceReportRelation{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, user_id, attendance_report_id, is_attended, created_at FROM student_attendance_report_relations WHERE user_id = $1 AND attendance_report_id=$2", user_id, attendance_report_id).
		Scan(&relation.Id, &relation.UserId, &relation.AttendanceReportId, &relation.IsAttended, &relation.CreatedAt)
	return
}

// DeleteStudentAttendanceReportRelation deletes a student attendance report relation record from the database.
func (relation *StudentAttendanceReportRelation) Delete() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM student_attendance_report_relations WHERE id = $1", relation.Id)
	return
}
