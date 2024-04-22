package model

import (
	"crypto/rand"
	"fmt"
	"log"
	"time"

	"golang.org/x/crypto/bcrypt"
)

func getTimeNow() (t time.Time) {
	t = time.Now()
	return
}
func generateUUID() (uuid string) {
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

func Encrypt(plaintext string) (cryptext string) {
	value, _ := bcrypt.GenerateFromPassword([]byte(plaintext), 10)
	cryptext = string(value)
	return
}
func CompareEncrypt(plaintext string, hashed string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(plaintext))
	return err == nil
}
