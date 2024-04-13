package model

import (
	"context"
	"time"
)

func CreateClass(name string, abbrev string) (conv Class, err error) {
	statement := "insert into classes (uuid, name, abbrev, created_at) values ($1, $2, $3, $4) returning id, uuid, topic, user_id, created_at"
	_, err = conn.Prepare(context.Background(), "insert-to-classes", statement)
	if err != nil {
		return
	}
	// use QueryRow context.Background(),to return a row and scan the returned id into the Session struct
	err = conn.QueryRow(context.Background(), "insert-to-classes", createUUID(), name, abbrev, time.Now()).Scan(&conv.Id, &conv.Uuid, &conv.Name, &conv.Abbrev, &conv.CreatedAt)
	return
}
func (cls *Class) Update(name string, abbrev string) (conv Class, err error) {
	statement := "update classes (name, abbrev) values ($1, $2) WHERE uuid=$3"
	_, err = conn.Prepare(context.Background(), "update-classes", statement)
	if err != nil {
		return
	}
	// use QueryRow context.Background(),to return a row and scan the returned id into the Session struct
	err = conn.QueryRow(context.Background(), "update-classes", name, abbrev, cls.Uuid).Scan(&conv.Id, &conv.Uuid, &conv.Name, &conv.Abbrev, &conv.CreatedAt)
	return
}

// Get a class by the UUID
func ClassByUUID(uuid string) (conv Class, err error) {
	conv = Class{}
	err = conn.QueryRow(context.Background(), "SELECT id, uuid, name, abbrev, created_at FROM classes WHERE uuid = $1", uuid).
		Scan(&conv.Id, &conv.Uuid, &conv.Name, &conv.Abbrev, &conv.CreatedAt)
	return
}
