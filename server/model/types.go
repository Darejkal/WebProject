package model

import "time"

type Thread struct {
	Id        int       `json:"id"`
	Uuid      string    `json:"uuid"`
	Topic     string    `json:"topic"`
	UserId    int       `json:"userid"`
	CreatedAt time.Time `json:"create_at"`
}

type Session struct {
	Id        int
	Uuid      string
	Email     string
	UserId    int
	CreatedAt time.Time
}

type Post struct {
	Id        int       `json:"id"`
	Uuid      string    `json:"uuid"`
	Content   string    `json:"content"`
	ThreadId  int       `json:"threadid"`
	UserId    int       `json:"userid"`
	CreatedAt time.Time `json:"create_at"`
}
type Exam struct {
	Id int `json:"id"`

	Uuid      string    `json:"uuid"`
	Name      string    `json:"name"`
	AuthorId  int       `json:"authorid"`
	CreatedAt time.Time `json:"create_at"`
	ExamType  string    `json:"exam_type"`
}
type ExamItemQuestion struct {
	Id        int       `json:"id"`
	Uuid      string    `json:"uuid"`
	ExamId    int       `json:"examid"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"create_at"`
}
type ExamItemChoice struct {
	Id         int       `json:"id"`
	Uuid       string    `json:"uuid"`
	QuestionId int       `json:"questionid"`
	Content    string    `json:"content"`
	CreatedAt  time.Time `json:"create_at"`
}
type ExamStudentRelation struct {
	Id          int       `json:"id"`
	UserId      int       `json:"userid"`
	ExamId      int       `json:"examid"`
	Score       int       `json:"score"`
	IsSubmitted bool      `json:"is_submitted"`
	IsScored    bool      `json:"is_scored"`
	CreatedAt   time.Time `json:"create_at"`
}
type ExamItemStudentRelation struct {
	Id             int       `json:"id"`
	UserId         int       `json:"userid"`
	QuestionId     int       `json:"questionid"`
	ChosenAnswerId int       `json:"answerid"`
	CreatedAt      time.Time `json:"create_at"`
}
type User struct {
	Id        int       `json:"id"`
	Name      string    `json:"name"`
	Uuid      string    `json:"uuid"`
	Password  string    `json:"password"`
	Email     string    `json:"email"`
	ClassId   int       `json:"classid"`
	SchoolId  int       `json:"schoolid"`
	CreatedAt time.Time `json:"create_at"`
}
type TeacherClassRelation struct {
	Id int `json:"id"`

	UserId    int       `json:"userid"`
	ClassId   int       `json:"classid"`
	CreatedAt time.Time `json:"create_at"`
}

type StudentClassRelation struct {
	Id int `json:"id"`

	UserId    int       `json:"userid"`
	ClassId   int       `json:"classid"`
	CreatedAt time.Time `json:"create_at"`
}
type Class struct {
	Id        int       `json:"id"`
	Uuid      string    `json:"uuid"`
	Name      string    `json:"name"`
	Abbrev    string    `json:"abbrev"`
	CreatedAt time.Time `json:"create_at"`
}
type Subject struct {
	Id        int       `json:"id"`
	Uuid      string    `json:"uuid"`
	Name      string    `json:"name"`
	Abbrev    string    `json:"abbrev"`
	CreatedAt time.Time `json:"create_at"`
}
type School struct {
	Id        int       `json:"id"`
	Uuid      string    `json:"uuid"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"create_at"`
}
