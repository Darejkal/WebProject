import {User} from "./user"
import {Subject, SubjectInstance} from "./subject"
import {Attendance} from "./attendance"
import {School} from "./school"
import { Exam, ExamAnswer, ExamInstance, Question } from "./exam";
export const db = {
    "Subject": Subject,
    "SubjectInstance": SubjectInstance,
    "User":User,
    "Attendance":Attendance,
    "School":School,
    "Exam":Exam,
    "Question":Question,
    "ExamInstance":ExamInstance,
    "ExamAnswer":ExamAnswer,
};
