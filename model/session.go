package model

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type Session struct {
	Uuid      string
	Email     string
	UserId    string
	CreatedAt time.Time
}

const sessionCollection = "session"

func (sess *databaseItemWrapper[Session]) Collection() (val string) {
	return "session"
}

// Create a new session for an existing user
func (user *User) CreateSession() (session Session, err error) {
	session = Session{
		Uuid:      generateUUID(),
		Email:     user.Email,
		UserId:    user.Uuid,
		CreatedAt: getTimeNow(),
	}
	result, err := db.Collection(sessionCollection).InsertOne(context.Background(), session)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("Created session in database with id: ", result.InsertedID)

	}
	return
}

// Get the session for an existing user
func (user *User) Session() (session Session, err error) {
	result := db.Collection(sessionCollection).FindOne(context.Background(), Session{
		UserId: user.Uuid,
	})
	err = result.Decode(session)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println("Get session in database with for userid: ", session.UserId)
	}
	return
}

func (session *Session) CheckAndFixByUUID() (valid bool, err error) {
	_session, err := SessionByUUID(session.Uuid)
	if err == nil {
		valid = true
		session.Email = _session.Email
		session.UserId = _session.UserId
		session.CreatedAt = _session.CreatedAt
		valid = true
	} else {
		valid = false
	}
	return
}
func SessionByUUID(uuid string) (session Session, err error) {
	_, err = findOne[Session](sessionCollection, bson.D{{"uuid", uuid}})
	return
}

// Delete session from database
func (session *Session) DeleteByUUID() (err error) {
	result, err := db.Collection(sessionCollection).DeleteOne(context.Background(), session)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Printf("Deleted %d session(s) in database.\n", result.DeletedCount)
	}
	return
}

// Get the user from the session
func (session *Session) User() (user User, err error) {
	user, err = UserByUUID(session.UserId)
	return
}

// // Delete all sessions from database
// func SessionDeleteAll() (err error) {

// }
