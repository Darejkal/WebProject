package main

import (
	"net/http"
	"testing"
)

func Test_Index(t *testing.T) {
	main_setup()
	_, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal("Getting Index failed")
	}
}
