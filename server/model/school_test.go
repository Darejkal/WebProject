package model

import (
	"context"
	"testing"
)

var schools = []School{
	{
		Name: "SOICT",
	},
	{
		Name: "MEC",
	},
}
var classes = []Class{
	{
		Name:   "IT-1 K66",
		Abbrev: "IT-1",
	},
	{
		Name:   "MEC K68",
		Abbrev: "MEC",
	},
}

func Test_Schools_CRUD(t *testing.T) {
	conn, err := createConn()
	defer func() {
		err = conn.Close(context.Background())
	}()
	statement := "delete from schools"
	_, err = conn.Exec(context.Background(), statement)
	if err != nil {
		t.Error(err, "Cannot delete all from schools.")
	}
	school, err := CreateSchool(schools[0].Name)
	if err != nil {
		t.Error(err, "Cannot create school.")
	}
	if school.Name != schools[0].Name {
		t.Error("School is not of correct name")
	}
	new_name := "SOICT-updated"
	school, err = school.Update(new_name)
	if err != nil {
		t.Error(err, "Cannot update school.")
	}
	if school.Name != new_name {
		t.Error("School is not of correct name")
	}
	rschool, err := SchoolByUUID(school.Uuid)
	if err != nil {
		t.Error(err, "Cannot get school by UUID.")
	}
	if rschool.Name != new_name {
		t.Error("Retrieved school is not of correct name")
	}
}
func Test_Classes_CRUD(t *testing.T) {
	conn, err := createConn()
	defer func() {
		err = conn.Close(context.Background())
	}()
	statement := "delete from classes"
	_, err = conn.Exec(context.Background(), statement)
	if err != nil {
		t.Error(err, "Cannot delete all from classes.")
	}
	class, err := CreateClass(classes[0].Name, classes[0].Abbrev)
	if err != nil {
		t.Error(err, "Cannot create class.")
	}
	if class.Name != classes[0].Name {
		t.Error("class is not of correct name")
	}
	class, err = class.Update(classes[1].Name, classes[1].Abbrev)
	if err != nil {
		t.Error(err, "Cannot update class.")
	}
	if class.Name != classes[1].Name || class.Abbrev != classes[1].Abbrev {
		t.Error("class is not of correct name,abbrev")
	}
	class, err = ClassByUUID(class.Uuid)
	if err != nil {
		t.Error(err, "Cannot get class by UUID.")
	}
	if class.Name != classes[1].Name || class.Abbrev != classes[1].Abbrev {
		t.Error("Retrieved class is not of correct name")
	}
}
