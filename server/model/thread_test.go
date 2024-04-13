package model

//
import (
	"context"
	"testing"
)

// Delete all threads from database
func ThreadDeleteAll() (err error) {
	conn, err := createConn()
	defer func() {
		err = conn.Close(context.Background())
	}()
	statement := "delete from threads"
	_, err = conn.Exec(context.Background(), statement)
	if err != nil {
		return
	}
	return
}

func Test_CreateThread(t *testing.T) {
	setup()
	if err := users[0].Create(); err != nil {
		t.Error(err, "Cannot create user.")
	}
	conv, err := users[0].CreateThread("My first thread")
	if err != nil {
		t.Error(err, "Cannot create thread")
	}
	if conv.UserId != users[0].Id {
		t.Error("User not linked with thread")
	}
}
