package model

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const dbName = "GO"
const dbURI = "mongodb://mongo:mongo@localhost:27017"
const dbURIFallback = ""

var db *mongo.Database

func init() {
	//client option
	clientOption := options.Client().ApplyURI(dbURI)

	//connect to mongodb
	client, err := mongo.Connect(context.TODO(), clientOption)

	if err != nil {
		log.Println(err)
		log.Println("retries with fallback uri...")
		clientOption = options.Client().ApplyURI(dbURIFallback)
		client, err = mongo.Connect(context.TODO(), clientOption)
		if err != nil {
			log.Fatal(err)
		}
	}
	fmt.Println("Database connected successfully!!")

	db = client.Database(dbName)

	//collection instance
	fmt.Println("Database is ready")
}
