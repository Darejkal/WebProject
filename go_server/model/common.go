package model

import (
	"context"
	"errors"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

type hasCollection interface {
	Collection() string
}

func findOne[T interface{}](collection string, filter bson.D) (result_value T, err error) {
	// log.Println(filter)
	result := db.Collection(collection).FindOne(context.Background(), filter)
	err = result.Err()
	if err != nil {
		log.Println(err)
	}
	err = result.Decode(&result_value)
	if err != nil {
		log.Println(err)
	}
	log.Printf("FindOne from %s returned %+v\n", collection, result_value)
	return
}
func deleteOne(collection string, filter bson.D) (err error) {
	// log.Println(filter)
	result, err := db.Collection(collection).DeleteOne(context.Background(), filter)
	if err != nil {
		log.Println(err)
	}
	if result.DeletedCount == 0 {
		err = errors.New("to-delete item does not exists")
		log.Println(err)
	}
	return
}

func CreateOneUnsafe[T any](collection string, value T) (err error) {
	log.Println("CREATE", value)
	marshalled, err := bson.Marshal(value)
	if err != nil {
		log.Println(err)
	}
	result, err := db.Collection(collection).InsertOne(context.Background(), marshalled)
	if err != nil {
		log.Println(err)
	} else {
		log.Printf("Inserted %s to collection %s\n", result.InsertedID, collection)
	}
	return
}

func DeleteOneUnsafe(collection string, filter bson.D) (err error) {
	result, err := db.Collection(collection).DeleteOne(context.Background(), filter)
	if err != nil {
		log.Println(err)
	}
	if result.DeletedCount == 0 {
		err = errors.New("to-delete item does not exists")
		log.Println(err)
	}
	return
}
func GetOneUnsafe[T any](collection string, filter bson.D) (result_value T, err error) {
	// log.Println(filter)
	result := db.Collection(collection).FindOne(context.Background(), filter)
	err = result.Err()
	if err != nil {
		log.Println(err)
	}
	err = result.Decode(&result_value)
	if err != nil {
		log.Println(err)
	}
	return
}
func UpdateOneUnsafe(collection string, filter bson.D, update bson.D) (err error) {
	result, err := db.Collection(collection).UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Println(err)
	}
	if result.ModifiedCount == 0 {
		err = errors.New("no item found to update")
		log.Println(err)
	}
	return
}
func GetAll[T any](collection string) (result_values []T, err error) {
	// log.Println(filter)
	result, err := db.Collection(collection).Find(context.Background(), bson.D{})
	if err != nil {
		log.Println(err)
	}
	log.Printf("GetAll %s collected %d item(s)\n", collection, result.RemainingBatchLength())
	if result.RemainingBatchLength() == 0 {
		err = errors.New("Collection is empty")
		log.Println(err)
	}
	err = result.All(context.Background(), &result_values)
	if err != nil {
		log.Println(err)
	}
	return
}
func CountItems(collection string, filter bson.D) (result int64, err error) {
	// log.Println(filter)
	result, err = db.Collection(collection).CountDocuments(context.Background(), filter)
	if err != nil {
		log.Println(err)
	}
	return
}

// func DeleteOneByUUID(collection string, uuid string) (err error) {
// 	err = deleteOne(collection, bson.D{{"uuid", uuid}})
// 	return
// }

// func findOneByMarshalled[T interface{}](collection string, filter []byte) (result_value T, err error) {
// 	log.Println(filter)
// 	result := db.Collection(collection).FindOne(context.Background(), filter)
// 	err = result.Err()
// 	if err != nil {
// 		log.Println(err)
// 	}
// 	err = result.Decode(&result_value)
// 	if err != nil {
// 		log.Println(err)
// 	}
// 	return
// }
