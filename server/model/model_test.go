package model

// test data
var users = []User{
	{
		Name:     "Peter Jones",
		Email:    "peter@gmail.com",
		Password: "peter_pass",
		ClassId:  1,
		SchoolId: 0,
	},
	{
		Name:     "John Smith",
		Email:    "john@gmail.com",
		Password: "john_pass",
		ClassId:  1,
		SchoolId: 0,
	},
}

func setup() {
	ThreadDeleteAll()
	SessionDeleteAll()
	UserDeleteAll()
}
