package model

import "time"

type Exam struct {
	Id        int
	Uuid      string
	Name      string
	AuthorId  int
	ExamType  string
	CreatedAt time.Time
}
type ExamInstance struct {
	Id                int
	Uuid              string
	SubjectInstanceId int
	ExamId            int
	CreatedAt         time.Time
}
type ExamItemQuestion struct {
	Id        int
	Uuid      string
	ExamId    int
	Content   string
	CreatedAt time.Time
}
type ExamItemAnswer struct {
	Id         int
	Uuid       string
	QuestionId int
	Content    string
	CreatedAt  time.Time
}
type ExamStudentRelation struct {
	Id          int
	UserId      int
	ExamId      int
	Score       int
	IsSubmitted bool
	IsScored    bool
	CreatedAt   time.Time
}
type ExamItemStudentRelation struct {
	Id             int
	UserId         int
	QuestionId     int
	ChosenAnswerId int
	CreatedAt      time.Time
}
