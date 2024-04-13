package model

import (
	"context"
	"time"
)

// Create a new session for an existing user
func (user *User) CreateSession() (session Session, err error) {
	statement := "insert into sessions (uuid, email, user_id, created_at) values ($1, $2, $3, $4) returning id, uuid, email, user_id, created_at"
	_, err = conn.Prepare(context.Background(), "insert-into-sessions", statement)
	if err != nil {
		return
	}
	// use QueryRow to return a row and scan the returned id into the Session struct
	err = conn.QueryRow(context.Background(), "insert-into-sessions", createUUID(), user.Email, user.Id, time.Now()).Scan(&session.Id, &session.Uuid, &session.Email, &session.UserId, &session.CreatedAt)
	return
}

// Get the session for an existing user
func (user *User) Session() (session Session, err error) {
	session = Session{}
	err = conn.QueryRow(context.Background(), "SELECT id, uuid, email, user_id, created_at FROM sessions WHERE user_id = $1", user.Id).
		Scan(&session.Id, &session.Uuid, &session.Email, &session.UserId, &session.CreatedAt)
	return
}

// Check if session is valid in the database
func (session *Session) Check() (valid bool, err error) {
	err = conn.QueryRow(context.Background(), "SELECT id, uuid, email, user_id, created_at FROM sessions WHERE uuid = $1", session.Uuid).
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
func (session *Session) DeleteByUUID() (err error) {
	statement := "delete from sessions where uuid = $1"
	_, err = conn.Prepare(context.Background(), "delete-from-sessions", statement)
	if err != nil {
		return
	}
	_, err = conn.Exec(context.Background(), "delete-from-sessions", session.Uuid)
	return
}

// Get the user from the session
func (session *Session) User() (user User, err error) {
	user = User{}
	err = conn.QueryRow(context.Background(), "SELECT id, uuid, name, email,classid,schoolid, created_at FROM users WHERE id = $1", session.UserId).
		Scan(&user.Id, &user.Uuid, &user.Name, &user.Email, &user.ClassId, &user.SchoolId, &user.CreatedAt)
	return
}

// Delete all sessions from database
func SessionDeleteAll() (err error) {
	statement := "delete from sessions"
	_, err = conn.Exec(context.Background(), statement)
	return
}

// Create a new user, save user info into the database
func (user *User) Create() (err error) {
	// Postgres does not automatically return the last insert id, because it would be wrong to assume
	// you're always using a sequence.You need to use the RETURNING keyword in your insert to get this
	// information from postgres.
	statement := "insert into users (uuid, name, email, password,classid,schoolid, created_at) values ($1, $2, $3, $4, $5) returning id, uuid, created_at"
	_, err = conn.Prepare(context.Background(), "insert-into-users", statement)
	if err != nil {
		return
	}

	// use QueryRow to return a row and scan the returned id into the User struct
	err = conn.QueryRow(context.Background(), "insert-into-users", createUUID(), user.Name, user.Email, Encrypt(user.Password), &user.ClassId, &user.SchoolId, time.Now()).Scan(&user.Id, &user.Uuid, &user.CreatedAt)
	return
}

// Delete user from database
func (user *User) Delete() (err error) {
	statement := "delete from users where id = $1"
	_, err = conn.Prepare(context.Background(), "delete-from-users", statement)
	if err != nil {
		return
	}

	_, err = conn.Exec(context.Background(), "delete-from-users", user.Id)
	return
}

// Update user information in the database
func (user *User) Update() (err error) {
	statement := "update users set name = $2, email = $3, classid=$4, schoolid=$5 where id = $1"
	_, err = conn.Prepare(context.Background(), "update-users", statement)
	if err != nil {
		return
	}

	_, err = conn.Exec(context.Background(), "update-users", user.Id, user.Name, &user.ClassId, &user.SchoolId, user.Email)
	return
}

// Delete all users from database
func UserDeleteAll() (err error) {
	statement := "delete from users"
	_, err = conn.Exec(context.Background(), statement)
	return
}

// Get all users in the database and returns it
func Users() (users []User, err error) {
	rows, err := conn.Query(context.Background(), "SELECT id, uuid, name, email, password, classid, schoolid created_at FROM users")
	if err != nil {
		return
	}
	for rows.Next() {
		user := User{}
		if err = rows.Scan(&user.Id, &user.Uuid, &user.Name, &user.Email, &user.Password, &user.ClassId, &user.SchoolId, &user.CreatedAt); err != nil {
			return
		}
		users = append(users, user)
	}
	rows.Close()
	return
}

// Get a single user given the email
func UserByEmail(email string) (user User, err error) {
	user = User{}
	err = conn.QueryRow(context.Background(), "SELECT id, uuid, name, email, password, classid, schoolid, created_at FROM users WHERE email = $1", email).
		Scan(&user.Id, &user.Uuid, &user.Name, &user.Email, &user.Password, &user.ClassId, &user.SchoolId, &user.CreatedAt)
	return
}

// Get a single user given the UUID
func UserByUUID(uuid string) (user User, err error) {
	user = User{}
	err = conn.QueryRow(context.Background(), "SELECT id, uuid, name, email, password, classid, schoolid, created_at FROM users WHERE uuid = $1", uuid).
		Scan(&user.Id, &user.Uuid, &user.Name, &user.Email, &user.Password, &user.ClassId, &user.SchoolId, &user.CreatedAt)
	return
}
