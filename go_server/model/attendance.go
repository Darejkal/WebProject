package model

import "time"

type AttendanceReport struct {
	Id        int
	Uuid      string
	Name      string
	CreatedAt time.Time
	hasCollection
}

func (item AttendanceReport) Collection() string {
	return "attendancereport"
}

type AttendanceReportItem struct {
	Id                 int
	UserId             int
	AttendanceReportId int
	IsAttended         bool
	CreatedAt          time.Time
	hasCollection
}

func (item AttendanceReportItem) Collection() string {
	return "attendancereportitem"
}
