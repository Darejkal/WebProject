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
	hasCollection
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
	err = CreateOneUnsafe[ChatThread](result.Collection(), result)
	return
}
func ChatThreadByUUID(uuid string) (returned ChatThread, err error) {
	returned, err = GetOneUnsafe[ChatThread](returned.Collection(), bson.D{{"uuid", uuid}})
	return
}
func (item ChatThread) NumReplies() int64 {
	result, _ := CountItems(Post{}.Collection(), bson.D{{"threadid", item.Uuid}})
	return result
}

type Post struct {
	Uuid      string
	Content   string
	ThreadId  string
	UserId    string
	CreatedAt time.Time
	hasCollection
}

func (item Post) Collection() string {
	return "chatthreadpost"
}
func (post Post) User() (user User, err error) {
	user, err = UserByUUID(post.UserId)
	return
}
func (user User) CreatePost(thread ChatThread, content string) (result Post, err error) {
	result = Post{
		Uuid:      generateUUID(),
		Content:   content,
		ThreadId:  thread.Uuid,
		UserId:    user.Uuid,
		CreatedAt: getTimeNow(),
	}
	err = CreateOneUnsafe[Post](result.Collection(), result)
	return
}
