package model

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const dbName = "GO"
const dbURI = "mongodb+srv://adminHP:bO9Dib4I51Wj@cluster0.bj4rphy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const dbURIFallback = "mongodb://adminHP:bO9Dib4I51Wj@ac-rqkr1rn-shard-00-00.bj4rphy.mongodb.net:27017,ac-rqkr1rn-shard-00-01.bj4rphy.mongodb.net:27017,ac-rqkr1rn-shard-00-02.bj4rphy.mongodb.net:27017/?ssl=true&replicaSet=atlas-5pftgu-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"

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
