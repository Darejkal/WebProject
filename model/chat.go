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
}

func (item *databaseItemWrapper[ChatThread]) Collection() string {
	return "chatthread"
}
func (user User) CreateChatThread(topic string) (result ChatThread, err error) {
	result = ChatThread{
		Uuid:      generateUUID(),
		Topic:     topic,
		UserId:    user.Uuid,
		CreatedAt: getTimeNow(),
	}
	wrapper := databaseItemWrapper[ChatThread]{
		object: &result,
	}
	err = wrapper.CreateOneUnsafe()
	result = *wrapper.object
	return
}
func ChatThreadByUUID(uuid string) (returned ChatThread, err error) {
	wrapper := databaseItemWrapper[ChatThread]{
		object: &returned,
	}
	err = wrapper.GetOneUnsafe(bson.D{{"uuid", uuid}})
	return
}

type Post struct {
	Uuid      string
	Content   string
	ThreadId  string
	UserId    string
	CreatedAt time.Time
}

func (item *databaseItemWrapper[Post]) Collection() string {
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
	wrapper := databaseItemWrapper[Post]{object: &result}
	err = wrapper.CreateOneUnsafe()
	return
}
