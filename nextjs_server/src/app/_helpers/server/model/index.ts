import {User} from "./user"
import {Subject, SubjectInstance,UserSubjectInstanceRelation} from "./subject"
import {Attendance} from "./attendance"
import {School} from "./school"
import { Exam, ExamAnswer, ExamInstance, Question } from "./exam";
export const db = {
    "Subject": Subject,
    "SubjectInstance": SubjectInstance,
    "UserSubjectInstanceRelation":UserSubjectInstanceRelation,
    "User":User,
    "Attendance":Attendance,
    "School":School,
    "Exam":Exam,
    "Question":Question,
    "ExamInstance":ExamInstance,
    "ExamAnswer":ExamAnswer,
    // "UserSubjectInstanceFullView":UserSubjectInstanceFullView
};
export default db
