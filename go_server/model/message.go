package model

import "time"

type ChatRoom struct {
	Uuid      string
	Topic     string
	UserId    string
	CreatedAt time.Time
	hasCollection
}
