package model

import "time"

type Subject struct {
	Id        int
	Uuid      string
	Name      string
	Abbrev    string
	CreatedAt time.Time
	hasCollection
}

func (item Subject) Collection() string {
	return "subject"
}

type SubjectInstance struct {
	Id        int
	Uuid      string
	Name      string
	CreatedAt time.Time
	hasCollection
}

func (item SubjectInstance) Collection() string {
	return "subjectinstance"
}

type TeacherSubjectItem struct {
	Id                int
	UserId            int
	SubjectInstanceId int
	CreatedAt         time.Time
	hasCollection
}

func (item TeacherSubjectItem) Collection() string {
	return "subjectinstanceitem"
}

type Class struct {
	Id        int
	Uuid      string
	Name      string
	Abbrev    string
	CreatedAt time.Time
	hasCollection
}

func (item Class) Collection() string {
	return "class"
}

type TeacherClassItem struct {
	Id        int
	UserId    int
	ClassId   int
	CreatedAt time.Time
	hasCollection
}

func (item TeacherClassItem) Collection() string {
	return "classitem"
}

type StudentSubjectItem struct {
	Id                int
	UserId            int
	SubjectInstanceId int
	CreatedAt         time.Time
	hasCollection
}
type School struct {
	Id        int
	Uuid      string
	Name      string
	CreatedAt time.Time
	hasCollection
}
