package model

import (
	"testing"
	"time"
)

// Mock data for testing
var (
	testUser = User{
		Id:        1,
		Uuid:      "test_uuid",
		Name:      "Test User",
		Email:     "test@example.com",
		Password:  "password",
		ClassId:   1,
		SchoolId:  1,
		CreatedAt: time.Now(),
	}

	testSession = Session{
		Id:        1,
		Uuid:      "test_session_uuid",
		Email:     "test@example.com",
		UserId:    1,
		CreatedAt: time.Now(),
	}

	testThread = Thread{
		Id:        1,
		Uuid:      "test_thread_uuid",
		Topic:     "Test Topic",
		UserId:    1,
		CreatedAt: time.Now(),
	}

	testPost = Post{
		Id:        1,
		Uuid:      "test_post_uuid",
		Content:   "Test Content",
		ThreadId:  1,
		UserId:    1,
		CreatedAt: time.Now(),
	}
)

func TestMain(t *testing.T) {
	var err error
	dbpool, err = createPool()
	if err != nil {
		t.Errorf("Error creating pool: %v", err)
	}
}
func TestUserCRUD(t *testing.T) {
	// Initialize your database connection pool here and pass it to CRUD functions

	// Test Create, Read, Update, Delete operations for User
	// Create
	err := testUser.Create()
	if err != nil {
		t.Errorf("Error creating user: %v", err)
	}
	// Read
	readUser, err := UserByUUID(testUser.Uuid)
	if err != nil {
		t.Errorf("Error reading user: %v", err)
	}
	// Update
	readUser.Name = "Updated Name"
	err = readUser.Update()
	if err != nil {
		t.Errorf("Error updating user: %v", err)
	}
	// Delete
	err = readUser.Delete()
	if err != nil {
		t.Errorf("Error deleting user: %v", err)
	}
}

func TestSessionCRUD(t *testing.T) {
	err := testUser.Create()
	if err != nil {
		t.Errorf("Error creating user: %v", err)
	}
	createdSession, err := testUser.CreateSession()
	if err != nil {
		t.Errorf("Error creating session: %v", err)
	}
	// Read
	_, err = createdSession.User()
	if err != nil {
		t.Errorf("Error reading session: %v", err)
	}
	// Check
	valid, err := createdSession.Check()
	if err != nil || !valid {
		t.Errorf("Error checking session: %v", err)
	}
	// Delete
	err = createdSession.Delete()
	if err != nil {
		t.Errorf("Error deleting session: %v", err)
	}
	err = testUser.Delete()
	if err != nil {
		t.Errorf("Error deleting user: %v", err)
	}
}

func TestThreadCRUD(t *testing.T) {
	err := testUser.Create()
	if err != nil {
		t.Errorf("Error creating user: %v", err)
	}
	// Initialize your database connection pool here and pass it to CRUD functions

	// Test Create, Read, and Delete operations for Thread
	// Create
	createdThread, err := testUser.CreateThread("Test Topic")
	if err != nil {
		t.Errorf("Error creating thread: %v", err)
	}
	// Read
	readThread, err := ThreadByUUID(createdThread.Uuid)
	if err != nil {
		t.Errorf("Error reading thread: %v", err)
	}
	// Delete
	err = readThread.Delete()
	if err != nil {
		t.Errorf("Error deleting thread: %v", err)
	}
	err = testUser.Delete()
	if err != nil {
		t.Errorf("Error deleting user: %v", err)
	}
}

func TestPostCRUD(t *testing.T) {
	err := testUser.Create()
	if err != nil {
		t.Errorf("Error creating user: %v", err)
	}
	createdThread, err := testUser.CreateThread(testThread.Topic)
	if err != nil {
		t.Errorf("Error creating thread: %v", err)
	}
	// Initialize your database connection pool here and pass it to CRUD functions

	// Test Create, Read, and Delete operations for Post
	// Create
	createdPost, err := testUser.CreatePost(createdThread, "Test Content")
	if err != nil {
		t.Errorf("Error creating post: %v", err)
	}
	// Read
	readPost, err := PostByUUID(createdPost.Uuid)
	if err != nil {
		t.Errorf("Error reading post: %v", err)
	}
	// Delete
	err = readPost.Delete()
	if err != nil {
		t.Errorf("Error deleting post: %v", err)
	}
	err = createdThread.Delete()
	if err != nil {
		t.Errorf("Error deleting thread: %v", err)
	}
	err = testUser.Delete()
	if err != nil {
		t.Errorf("Error deleting user: %v", err)
	}
}

func TestClassCRUD(t *testing.T) {
	// Create a test Class
	testClass := Class{
		Uuid:      "test_uuid",
		Name:      "Test Class",
		Abbrev:    "TC",
		CreatedAt: time.Now(),
	}

	// Create Class
	createdClass, err := CreateClass(testClass.Name, testClass.Abbrev)
	if err != nil {
		t.Fatalf("Error creating class: %v", err)
	}

	// Read Class
	readClass, err := ClassByUUID(createdClass.Uuid)
	if err != nil {
		t.Fatalf("Error reading class: %v", err)
	}

	// Update Class
	updatedClass, err := readClass.Update("KHMT", "IT1")
	if updatedClass.Name != "KHMT" || updatedClass.Abbrev != "IT1" {
		t.Fatalf("Error updating class: Name mismatch")
	}

	if err != nil {
		t.Fatalf("Error updating class: %v", err)
	}

	// Delete Class
	err = readClass.Delete()
	if err != nil {
		t.Fatalf("Error deleting class: %v", err)
	}
}

func TestSchoolCRUD(t *testing.T) {
	// Create a test School
	testSchool := School{
		Uuid:      "test_uuid",
		Name:      "Test School",
		CreatedAt: time.Now(),
	}

	// Create School
	createdSchool, err := CreateSchool(testSchool.Name)
	if err != nil {
		t.Fatalf("Error creating school: %v", err)
	}

	// Read School
	readSchool, err := SchoolByUUID(createdSchool.Uuid)
	if err != nil {
		t.Fatalf("Error reading school: %v", err)
	}

	// Update School

	updatedSchool, err := readSchool.Update("SOICT HAHAHAHAHA")
	if updatedSchool.Name != "SOICT HAHAHAHAHA" {
		t.Fatalf("Error updating school: Name mismatch")
	}
	if err != nil {
		t.Fatalf("Error updating school: %v", err)
	}

	// Delete School
	err = readSchool.Delete()
	if err != nil {
		t.Fatalf("Error deleting school: %v", err)
	}
}
