package model

import (
	"context"
	"time"
)

// Create a new session for an existing user
func (user *User) CreateSession() (session Session, err error) {
	statement := "INSERT INTO sessions (uuid, email, user_id, created_at) VALUES ($1, $2, $3, $4) RETURNING id, uuid, email, user_id, created_at"
	err = dbpool.QueryRow(context.Background(), statement, createUUID(), user.Email, user.Id, time.Now()).Scan(&session.Id, &session.Uuid, &session.Email, &session.UserId, &session.CreatedAt)
	return
}

// Get the session for an existing user
func (user *User) Session() (session Session, err error) {
	session = Session{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, email, user_id, created_at FROM sessions WHERE user_id = $1", user.Id).
		Scan(&session.Id, &session.Uuid, &session.Email, &session.UserId, &session.CreatedAt)
	return
}

// Check if session is valid in the database
func (session *Session) Check() (valid bool, err error) {
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, email, user_id, created_at FROM sessions WHERE uuid = $1", session.Uuid).
		Scan(&session.Id, &session.Uuid, &session.Email, &session.UserId, &session.CreatedAt)
	if err != nil {
		valid = false
		return
	}
	if session.Id != 0 {
		valid = true
	}
	return
}

// Delete session from database
func (session *Session) Delete() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM sessions WHERE uuid = $1", session.Uuid)
	return
}

// Get the user from the session
func (session *Session) User() (user User, err error) {
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, name, email, class_id, school_id, created_at FROM users WHERE id = $1", session.UserId).
		Scan(&user.Id, &user.Uuid, &user.Name, &user.Email, &user.ClassId, &user.SchoolId, &user.CreatedAt)
	return
}

// Delete all sessions from database
func SessionDeleteAll() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM sessions")
	return
}

// Create a new user, save user info into the database
func (user *User) Create() (err error) {
	statement := "INSERT INTO users (uuid, name, email, password, class_id, school_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, uuid, created_at"
	err = dbpool.QueryRow(context.Background(), statement, createUUID(), user.Name, user.Email, Encrypt(user.Password), user.ClassId, user.SchoolId, time.Now()).Scan(&user.Id, &user.Uuid, &user.CreatedAt)
	return
}

// Delete user from database
func (user *User) Delete() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM users WHERE id = $1", user.Id)
	return
}

// Update user information in the database
func (user *User) Update() (err error) {
	_, err = dbpool.Exec(context.Background(), "UPDATE users SET name = $2, email = $3, class_id = $4, school_id = $5 WHERE id = $1", user.Id, user.Name, user.Email, user.ClassId, user.SchoolId)
	return
}

// Delete all users from database
func UserDeleteAll() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM users")
	return
}

// Get all users in the database and returns it
func Users() (users []User, err error) {
	rows, err := dbpool.Query(context.Background(), "SELECT id, uuid, name, email, password, class_id, school_id, created_at FROM users")
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		user := User{}
		if err = rows.Scan(&user.Id, &user.Uuid, &user.Name, &user.Email, &user.Password, &user.ClassId, &user.SchoolId, &user.CreatedAt); err != nil {
			return
		}
		users = append(users, user)
	}
	return
}

// Get a single user given the email
func UserByEmail(email string) (user User, err error) {
	user = User{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, name, email, password, class_id, school_id, created_at FROM users WHERE email = $1", email).
		Scan(&user.Id, &user.Uuid, &user.Name, &user.Email, &user.Password, &user.ClassId, &user.SchoolId, &user.CreatedAt)
	return
}

// Get a single user given the UUID
func UserByUUID(uuid string) (user User, err error) {
	user = User{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, name, email, password, class_id, school_id, created_at FROM users WHERE uuid = $1", uuid).
		Scan(&user.Id, &user.Uuid, &user.Name, &user.Email, &user.Password, &user.ClassId, &user.SchoolId, &user.CreatedAt)
	return
}
