package model

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type User struct {
	Name        string
	Uuid        string
	Password    string
	Email       string
	ClassId     string
	SchoolId    string
	PhoneNumber string
	CreatedAt   time.Time
	hasCollection
}

const userCollection = "user"

func (user User) Collection() (val string) {
	return "user"
}

// Create a new user, save user info into the database
func CreateUser(name string, unencrypted_password string, email string, classid string, schoolid string) (user User, err error) {
	if name == "" || email == "" {
		err = fmt.Errorf("invalid name (%s) or email (%s)", name, email)
		return
	}
	user, err = UserByEmail(email)
	if err == nil {
		err = fmt.Errorf("user with the email existed: %s", email)
		return
	}
	user = User{
		Name:     name,
		Password: Encrypt(unencrypted_password),
		Email:    email,
		ClassId:  classid,
		SchoolId: schoolid,
	}
	user.Uuid = generateUUID()
	user.CreatedAt = getTimeNow()
	result, err := db.Collection(userCollection).InsertOne(context.Background(), user)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("Created user in database with id: ", result.InsertedID)
	}
	return
}

// Delete user from database
func (user *User) Delete() (err error) {
	err = deleteOne(userCollection, bson.D{{"uuid", user.Uuid}})
	return
}

// Update user information in the database
func (user *User) Update(updated_user *User) (err error) {
	result, err := db.Collection(userCollection).UpdateOne(context.Background(), user, updated_user)
	if err != nil {
		log.Println(err)
	}
	log.Printf("Updated %d user(s) in database.\n", result.ModifiedCount)
	return
}

// // Delete all users from database
// func UserDeleteAll() (err error) {

// }

// Get all users in the database and returns it
func Users() (users []User, err error) {
	result, err := db.Collection(userCollection).Find(context.Background(), bson.D{})
	if err != nil {
		log.Println(err)
	}
	log.Printf("Getting %d user(s) in database.\n", result.RemainingBatchLength())
	err = result.All(context.Background(), &users)
	if err != nil {
		log.Println(err)
	} else {
		log.Println(users)
	}
	return
}

// Get a single user given the email
func UserByEmail(email string) (user User, err error) {
	user, err = findOne[User](userCollection, bson.D{
		{"email", email},
	})
	return
}

// Get a single user given the UUID
func UserByUUID(uuid string) (user User, err error) {
	user, err = findOne[User](userCollection, bson.D{
		{"uuid", uuid},
	})
	return
}

type AssignedPosition struct {
	UserUuid  string
	Position  string
	CreatedAt time.Time
}

var assignedPositionCollection = "AssignedPosition"

func (user *User) CreateAssignedPosition(position string) (err error) {
	assignedPosition := AssignedPosition{
		UserUuid:  user.Uuid,
		Position:  position,
		CreatedAt: getTimeNow(),
	}
	result, err := db.Collection(assignedPositionCollection).InsertOne(context.Background(), assignedPosition)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("Assigned Position in database with id: ", result.InsertedID)
	}
	return
}
func (user *User) GetAssignedPosition(position string) (returned_position AssignedPosition, err error) {
	result := db.Collection(assignedPositionCollection).FindOne(context.Background(), AssignedPosition{
		UserUuid: user.Uuid,
	})
	err = result.Err()
	if err != nil {
		log.Println(err)
	}
	log.Printf("Getting 1 user(s) in database.\n")
	err = result.Decode(returned_position)
	if err != nil {
		log.Println(err)
	}
	return
}
