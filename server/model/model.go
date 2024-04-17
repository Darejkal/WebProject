package model

import (
	"context"
	"crypto/rand"
	"crypto/sha1"
	"fmt"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

// var conn *pgx.Conn

//	func createConn() (conn *pgx.Conn, err error) {
//		conn, err = pgx.Connect(context.Background(), "postgres://postgres:postgres@0.0.0.0:5432/postgres")
//		if err != nil {
//			log.Fatal(err)
//		}
//		return
//	}
var dbpool *pgxpool.Pool

func createPool() (dbpool *pgxpool.Pool, err error) {
	config, err := pgxpool.ParseConfig("postgres://postgres:xuyenkim@127.0.0.1:8000/webqrcode")
	if err != nil {
		return nil, err
	}

	// You can customize pool configuration here if needed

	dbpool, err = pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		return nil, err
	}

	return
}
func init() {
	dbpool, _ = createPool()
}

// create a random UUID with from RFC 4122
// adapted from http://github.com/nu7hatch/gouuid
func createUUID() (uuid string) {
	u := new([16]byte)
	_, err := rand.Read(u[:])
	if err != nil {
		log.Fatalln("Cannot generate UUID", err)
	}

	// 0x40 is reserved variant from RFC 4122
	u[8] = (u[8] | 0x40) & 0x7F
	// Set the four most significant bits (bits 12 through 15) of the
	// time_hi_and_version field to the 4-bit version number.
	u[6] = (u[6] & 0xF) | (0x4 << 4)
	uuid = fmt.Sprintf("%x-%x-%x-%x-%x", u[0:4], u[4:6], u[6:8], u[8:10], u[10:])
	return
}

// hash plaintext with SHA-1
func Encrypt(plaintext string) (cryptext string) {
	cryptext = fmt.Sprintf("%x", sha1.Sum([]byte(plaintext)))
	return
}
