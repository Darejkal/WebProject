package model

import (
	"context"
	"time"
)

// format the CreatedAt date to display nicely on the screen
func (thread *Thread) CreatedAtDate() string {
	return thread.CreatedAt.Format("Jan 2, 2006 at 3:04pm")
}

func (post *Post) CreatedAtDate() string {
	return post.CreatedAt.Format("Jan 2, 2006 at 3:04pm")
}

// get the number of posts in a thread
func (thread *Thread) NumReplies() (count int, err error) {
	err = dbpool.QueryRow(context.Background(), "SELECT count(*) FROM posts WHERE thread_id = $1", thread.Id).Scan(&count)
	return
}

// get posts to a thread
func (thread *Thread) Posts() (posts []Post, err error) {
	rows, err := dbpool.Query(context.Background(), "SELECT id, uuid, content, user_id, thread_id, created_at FROM posts WHERE thread_id = $1", thread.Id)
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		post := Post{}
		err = rows.Scan(&post.Id, &post.Uuid, &post.Content, &post.UserId, &post.ThreadId, &post.CreatedAt)
		if err != nil {
			return
		}
		posts = append(posts, post)
	}
	return
}

// PostByUUID retrieves a post from the database using its UUID.
func PostByUUID(uuid string) (post Post, err error) {
	post = Post{}
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, content, thread_id, user_id, created_at FROM posts WHERE uuid = $1", uuid).
		Scan(&post.Id, &post.Uuid, &post.Content, &post.ThreadId, &post.UserId, &post.CreatedAt)
	return
}

// DeleteByUUID deletes the post from the database using its UUID.
func (post *Post) Delete() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM posts WHERE uuid = $1", post.Uuid)
	return
}

// Create a new thread
func (user *User) CreateThread(topic string) (conv Thread, err error) {
	statement := "INSERT INTO threads (uuid, topic, user_id, created_at) VALUES ($1, $2, $3, $4) RETURNING id, uuid, topic, user_id, created_at"
	err = dbpool.QueryRow(context.Background(), statement, createUUID(), topic, user.Id, time.Now()).Scan(&conv.Id, &conv.Uuid, &conv.Topic, &conv.UserId, &conv.CreatedAt)
	return
}

// Create a new post to a thread
func (user *User) CreatePost(conv Thread, body string) (post Post, err error) {
	statement := "INSERT INTO posts (uuid, content, user_id, thread_id, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, uuid, content, user_id, thread_id, created_at"
	err = dbpool.QueryRow(context.Background(), statement, createUUID(), body, user.Id, conv.Id, time.Now()).Scan(&post.Id, &post.Uuid, &post.Content, &post.UserId, &post.ThreadId, &post.CreatedAt)
	return
}

// Get all threads in the database and returns it
func Threads() (threads []Thread, err error) {
	rows, err := dbpool.Query(context.Background(), "SELECT id, uuid, topic, user_id, created_at FROM threads ORDER BY created_at DESC")
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		conv := Thread{}
		err = rows.Scan(&conv.Id, &conv.Uuid, &conv.Topic, &conv.UserId, &conv.CreatedAt)
		if err != nil {
			return
		}
		threads = append(threads, conv)
	}
	return
}

// Get a thread by the UUID
func ThreadByUUID(uuid string) (conv Thread, err error) {
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, topic, user_id, created_at FROM threads WHERE uuid = $1", uuid).
		Scan(&conv.Id, &conv.Uuid, &conv.Topic, &conv.UserId, &conv.CreatedAt)
	return
}

// DeleteByUUID deletes the thread from the database using its UUID.
func (thread *Thread) Delete() (err error) {
	_, err = dbpool.Exec(context.Background(), "DELETE FROM threads WHERE uuid = $1", thread.Uuid)
	return
}

// Get the user who started this thread
func (thread *Thread) User() (user User, err error) {
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, name, email, created_at, class_id, school_id FROM users WHERE id = $1", thread.UserId).
		Scan(&user.Id, &user.Uuid, &user.Name, &user.Email, &user.CreatedAt, &user.ClassId, &user.SchoolId)
	return
}

// Get the user who wrote the post
func (post *Post) User() (user User, err error) {
	err = dbpool.QueryRow(context.Background(), "SELECT id, uuid, name, email, created_at, class_id, school_id FROM users WHERE id = $1", post.UserId).
		Scan(&user.Id, &user.Uuid, &user.Name, &user.Email, &user.CreatedAt, &user.ClassId, &user.SchoolId)
	return
}
