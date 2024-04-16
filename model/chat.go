package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type ChatThread struct {
	Uuid      string
	Topic     string
	UserId    string
	CreatedAt time.Time
	databaseItem[ChatThread]
}

func (item ChatThread) Collection() string {
	return "chatthread"
}
func (user User) CreateChatThread(topic string) (result ChatThread, err error) {
	result = ChatThread{
		Uuid:      generateUUID(),
		Topic:     topic,
		UserId:    user.Uuid,
		CreatedAt: getTimeNow(),
	}
	err = result.CreateOneUnsafe(result)
	return
}
func ChatThreadByUUID(uuid string) (returned ChatThread, err error) {
	returned, err = returned.GetOneUnsafe(bson.D{{"uuid", uuid}})
	return
}

type Post struct {
	Uuid      string
	Content   string
	ThreadId  string
	UserId    string
	CreatedAt time.Time
	databaseItem[Post]
}

func (item Post) Collection() string {
	return "chatthreadpost"
}
func (user User) CreatePost(thread ChatThread, content string) (result Post, err error) {
	result = Post{
		Uuid:      generateUUID(),
		Content:   content,
		ThreadId:  thread.Uuid,
		UserId:    user.Uuid,
		CreatedAt: getTimeNow(),
	}
	err = result.CreateOneUnsafe(result)
	return
}
