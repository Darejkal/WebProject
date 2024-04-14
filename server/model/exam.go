package model

import (
	"context"
	"time"
)

// CreateExam inserts a new exam into the database
func CreateExam(name string, authorid int, exam_type string) (exam Exam, err error) {
	query := `
        INSERT INTO exams (uuid, name, authorid, exam_type, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING uuid, name, authorid, exam_type, created_at
    `
	err = dbpool.QueryRow(context.Background(), query, createUUID(), name, authorid, exam_type, time.Now()).Scan(&exam.Id, &exam.Uuid, &exam.Name, &exam.AuthorId, &exam.ExamType, &exam.CreatedAt)
	return
}

// GetExam retrieves an exam from the database by its ID
func ExamByUUID(uuid string) (exam Exam, err error) {
	query := `
        SELECT id, uuid, name, authorid, exam_type, created_at
        FROM exams
        WHERE uuid = $1
    `
	err = dbpool.QueryRow(context.Background(), query, uuid).Scan(&exam.Id, &exam.Uuid, &exam.Name, &exam.AuthorId, &exam.ExamType, &exam.CreatedAt)
	return
}

func (exam *Exam) Update(name string, authorid int, exam_type string) (conv Exam, err error) {
	query := `
        UPDATE exams
        SET  name = $1, authorid = $2, exam_type = $3
        WHERE id = $4
    `
	err = dbpool.QueryRow(context.Background(), query, name, authorid, exam_type, exam.Id).Scan(&conv.Id, &conv.Uuid, &conv.Name, &conv.AuthorId, &exam.ExamType, &conv.CreatedAt)
	return
}

func (exam *Exam) Delete() (err error) {
	query := `
        DELETE FROM exams
        WHERE id = $1
    `
	_, err = dbpool.Exec(context.Background(), query, exam.Id)
	return
}

// CreateExamInstance creates a new exam instance in the database.
func CreateExamInstance(subject_instance_id int, exam_id int) (conv *ExamInstance, err error) {
	err = dbpool.QueryRow(context.Background(), `
		INSERT INTO exam_instances (uuid, subject_instance_id, exam_id, created_at)
		VALUES ($1, $2, $3, $4)
		RETURNING (id,uuid, subject_instance_id, exam_id, created_at)
	`, createUUID(), subject_instance_id, exam_id, time.Now()).Scan(&conv.Id, &conv.Uuid, &conv.SubjectInstanceId, &conv.ExamId, &conv.CreatedAt)
	return
}

// ReadExamInstance retrieves an exam instance from the database by ID.
func ExamInstanceByUUID(uuid string) (examInstance ExamInstance, err error) {
	err = dbpool.QueryRow(context.Background(), `
		SELECT id, uuid, subject_instance_id, exam_id, created_at
		FROM exam_instances
		WHERE uuid = $1
	`, uuid).Scan(&examInstance.Id, &examInstance.Uuid, &examInstance.SubjectInstanceId, &examInstance.ExamId, &examInstance.CreatedAt)
	return
}

// UpdateExamInstance updates an existing exam instance in the database.
func (examInstance *ExamInstance) Update(subject_instance_id int, exam_id int) (conv ExamInstance, err error) {
	query := `
		UPDATE exam_instances
		SET subject_instance_id = $1, exam_id = $2
		WHERE id = $3
	`
	err = dbpool.QueryRow(context.Background(), query, subject_instance_id, exam_id, examInstance.Id).Scan(&conv.Id, &conv.Uuid, &conv.SubjectInstanceId, &conv.ExamId, &conv.CreatedAt)
	return
}

// DeleteExamInstance deletes an exam instance from the database by ID.
func (examInstance *ExamInstance) Delete() (err error) {
	_, err = dbpool.Exec(context.Background(), `
		DELETE FROM exam_instances
		WHERE id = $1
	`, examInstance.Id)
	return
}

func CreateExamItemStudentRelation(userID, questionID, chosenAnswerID int) (conv ExamItemStudentRelation, err error) {
	statement := "INSERT INTO exam_item_student_relations (user_id, question_id, chosen_answer_id, created_at) VALUES ($1, $2, $3, $4) RETURNING id, user_id, question_id, chosen_answer_id, created_at"
	err = dbpool.QueryRow(context.Background(), statement, userID, questionID, chosenAnswerID, time.Now()).Scan(&conv.Id, &conv.UserId, &conv.QuestionId, &conv.ChosenAnswerId, &conv.CreatedAt)
	return
}

func (relation *ExamItemStudentRelation) Update(chosenAnswerID int) (conv ExamItemStudentRelation, err error) {
	statement := "UPDATE exam_item_student_relations SET chosen_answer_id=$1 WHERE id=$2"
	err = dbpool.QueryRow(context.Background(), statement, chosenAnswerID, relation.Id).Scan(&conv.Id, &conv.UserId, &conv.QuestionId, &conv.ChosenAnswerId, &conv.CreatedAt)
	return
}

func ExamItemStudentRelationByUUID(uuid string) (conv ExamItemStudentRelation, err error) {
	conv = ExamItemStudentRelation{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, user_id, question_id, chosen_answer_id, created_at FROM exam_item_student_relations WHERE uuid = $1", uuid).
		Scan(&conv.Id, &conv.UserId, &conv.QuestionId, &conv.ChosenAnswerId, &conv.CreatedAt)
	return
}
func GetExamItemStudentRelation(user_id int, question_id int) (conv ExamItemStudentRelation, err error) {
	conv = ExamItemStudentRelation{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, user_id, question_id, chosen_answer_id, created_at FROM exam_item_student_relations WHERE user_id = $1, question_id = $2", user_id, question_id).
		Scan(&conv.Id, &conv.UserId, &conv.QuestionId, &conv.ChosenAnswerId, &conv.CreatedAt)
	return
}
func (relation *ExamItemStudentRelation) Delete() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM exam_item_student_relations WHERE id = $1", relation.Id)
	return
}
