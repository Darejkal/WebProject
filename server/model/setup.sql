DROP TABLE IF EXISTS exam_student_relations CASCADE;
DROP TABLE IF EXISTS exam_item_student_relations CASCADE;
DROP TABLE IF EXISTS exam_instances CASCADE;
DROP TABLE IF EXISTS exam_item_answers CASCADE;
DROP TABLE IF EXISTS exam_item_questions CASCADE;
DROP TABLE IF EXISTS exams CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS threads CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS teacher_class_relations CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS subject_instances CASCADE;
DROP TABLE IF EXISTS teacher_subject_relations CASCADE;
DROP TABLE IF EXISTS student_subject_relations CASCADE;
DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS attendance_reports CASCADE;
DROP TABLE IF EXISTS attendance_items CASCADE;

CREATE TABLE schools (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  name       VARCHAR(255),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE classes (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  name       VARCHAR(255),
  abbrev     VARCHAR(255),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  name       VARCHAR(255),
  email      VARCHAR(255) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  class_id   INTEGER REFERENCES classes(id),
  school_id  INTEGER REFERENCES schools(id),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE exams (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  name       VARCHAR(255),
  author_id  INTEGER REFERENCES users(id),
  exam_type  VARCHAR(255),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE exam_item_questions (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  exam_id    INTEGER REFERENCES exams(id),
  content    TEXT,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE exam_item_answers (
  id          SERIAL PRIMARY KEY,
  uuid        VARCHAR(64) NOT NULL UNIQUE,
  question_id INTEGER REFERENCES exam_item_questions(id),
  content     TEXT,
  created_at  TIMESTAMP NOT NULL
);

CREATE TABLE exam_student_relations (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id),
  exam_id     INTEGER REFERENCES exams(id),
  score       INTEGER,
  is_submitted BOOLEAN,
  is_scored   BOOLEAN,
  created_at  TIMESTAMP NOT NULL
);

CREATE TABLE exam_item_student_relations (
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER REFERENCES users(id),
  question_id    INTEGER REFERENCES exam_item_questions(id),
  chosen_answer_id INTEGER REFERENCES exam_item_answers(id),
  created_at     TIMESTAMP NOT NULL
);

CREATE TABLE exam_instances (
  id                SERIAL PRIMARY KEY,
  uuid              VARCHAR(64) NOT NULL UNIQUE,
  subject_instance_id INTEGER REFERENCES subject_instances(id),
  exam_id           INTEGER REFERENCES exams(id),
  created_at        TIMESTAMP NOT NULL
);

CREATE TABLE teacher_class_relations (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER REFERENCES users(id),
  class_id   INTEGER REFERENCES classes(id),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE subjects (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  name       VARCHAR(255),
  abbrev     VARCHAR(255),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE subject_instances (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  name       VARCHAR(255),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE teacher_subject_relations (
  id                SERIAL PRIMARY KEY,
  user_id            INTEGER REFERENCES users(id),
  subject_instance_id INTEGER REFERENCES subject_instances(id),
  created_at         TIMESTAMP NOT NULL
);

CREATE TABLE student_subject_relations (
  id                SERIAL PRIMARY KEY,
  user_id            INTEGER REFERENCES users(id),
  subject_instance_id INTEGER REFERENCES subject_instances(id),
  created_at         TIMESTAMP NOT NULL
);

CREATE TABLE attendance_reports (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  name       VARCHAR(255),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE attendance_items (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  name       VARCHAR(255),
  created_at TIMESTAMP NOT NULL
);
CREATE TABLE threads (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  topic      VARCHAR(255),
  user_id    INTEGER REFERENCES users(id),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE sessions (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  email      VARCHAR(255),
  user_id    INTEGER REFERENCES users(id),
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  uuid       VARCHAR(64) NOT NULL UNIQUE,
  content    TEXT,
  thread_id  INTEGER REFERENCES threads(id),
  user_id    INTEGER REFERENCES users(id),
  created_at TIMESTAMP NOT NULL
);