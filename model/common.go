package model

import (
	"context"
	"errors"
	"log"

	"go.mongodb.org/mongo-driver/bson"
)

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

type hasCollection interface {
	Collection() (value string)
}
type databaseItem[T any] struct {
	hasCollection
}

func (item *databaseItem[T]) CreateOneUnsafe(value T) (err error) {
	log.Println("CREATE", value)
	marshalled, err := bson.Marshal(value)

	result, err := db.Collection(item.Collection()).InsertOne(context.Background(), marshalled)
	if err != nil {
		log.Println(err)
	} else {
		log.Println("Inserted %s to collection", result.InsertedID, item.Collection())
	}
	return
}

func (item *databaseItem[T]) DeleteOneUnsafe(filter bson.D) (err error) {
	result, err := db.Collection(item.Collection()).DeleteOne(context.Background(), filter)
	if err != nil {
		log.Println(err)
	}
	if result.DeletedCount == 0 {
		err = errors.New("to-delete item does not exists")
		log.Println(err)
	}
	return
}
func (item *databaseItem[T]) GetOneUnsafe(filter bson.D) (result_value T, err error) {
	// log.Println(filter)
	result := db.Collection(item.Collection()).FindOne(context.Background(), filter)
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
func (item *databaseItem[T]) UpdateOneUnsafe(filter bson.D, update bson.D) (err error) {
	result, err := db.Collection(item.Collection()).UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Println(err)
	}
	if 0 == result.ModifiedCount {
		err = errors.New("No item found to update")
		log.Println(err)
	}
	return
}
func (item *databaseItem[T]) GetAll(collection string) (result_values []T, err error) {
	// log.Println(filter)
	result, err := db.Collection(item.Collection()).Find(context.Background(), bson.D{})
	if err != nil {
		log.Println(err)
	}
	if 0 == result.RemainingBatchLength() {
		err = errors.New("Collection is empty")
		log.Println(err)
	}
	err = result.All(context.Background(), result_values)
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
