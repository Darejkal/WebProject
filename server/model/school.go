package model

import (
	"context"
	"time"
)

func CreateClass(name string, abbrev string) (conv Class, err error) {
	statement := "INSERT INTO classes (uuid, name, abbrev, created_at) VALUES ($1, $2, $3, $4) RETURNING id, uuid, name, abbrev, created_at"
	err = dbpool.QueryRow(context.Background(), statement, createUUID(), name, abbrev, time.Now()).Scan(&conv.Id, &conv.Uuid, &conv.Name, &conv.Abbrev, &conv.CreatedAt)
	return
}

func (cls *Class) Update(name string, abbrev string) (conv Class, err error) {
	statement := "UPDATE classes SET name=$1, abbrev=$2 WHERE uuid=$3"
	err = dbpool.QueryRow(context.Background(), statement, name, abbrev, cls.Uuid).Scan(&conv.Id, &conv.Uuid, &conv.Name, &conv.Abbrev, &conv.CreatedAt)
	return
}

// Get a class by the UUID
func ClassByUUID(uuid string) (conv Class, err error) {
	conv = Class{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, name, abbrev, created_at FROM classes WHERE uuid = $1", uuid).
		Scan(&conv.Id, &conv.Uuid, &conv.Name, &conv.Abbrev, &conv.CreatedAt)
	return
}

func (class *Class) Delete() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM classes WHERE uuid = $1", class.Uuid)
	return
}

func CreateSchool(name string) (conv School, err error) {
	statement := "INSERT INTO schools (uuid, name, created_at) VALUES ($1, $2, $3) RETURNING id, uuid, name, created_at"
	err = dbpool.QueryRow(context.Background(), statement, createUUID(), name, time.Now()).Scan(&conv.Id, &conv.Uuid, &conv.Name, &conv.CreatedAt)
	return
}

func (school *School) Update(name string) (conv School, err error) {
	statement := "UPDATE schools SET name=$1 WHERE uuid=$2"
	err = dbpool.QueryRow(context.Background(), statement, name, school.Uuid).Scan(&conv.Id, &conv.Uuid, &conv.Name, &conv.CreatedAt)
	return
}

// Get a class by the UUID
func SchoolByUUID(uuid string) (conv School, err error) {
	conv = School{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, name, created_at FROM schools WHERE uuid = $1", uuid).
		Scan(&conv.Id, &conv.Uuid, &conv.Name, &conv.CreatedAt)
	return
}

func (school *School) Delete() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM schools WHERE uuid = $1", school.Uuid)
	return
}
