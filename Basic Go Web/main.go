package main

import (
	"fmt"
	"log"
	"net/http"
)

// log for error purposes and net/http for routes

// every func has a request is a pointer and response is normal
func hellohandler(response http.ResponseWriter, request *http.Request) {
	// checing if path is correct
	if request.URL.Path != "/hello" {
		http.Error(response, "404 Not Found", http.StatusNotFound)
		return
	}

	// only get request allowed
	if request.Method != "GET" {
		http.Error(response, "Get Request Only", http.StatusNotFound)
		return
	}
	// Fprintf will print it on Screen
	fmt.Fprintf(response, "Hello and Welcome to PGS17 World ")
}

func formhandler(response http.ResponseWriter, request *http.Request) {
	// parse the form for pst,put,patch req and check error
	if err := request.ParseForm(); err != nil {
		fmt.Fprintf(response, " Parse Form Error: %v", err)
		return
	}

	fmt.Fprintf(response, "Post Request Successful")
	name := request.FormValue("Name")
	address := request.FormValue("Address")
	fmt.Fprintf(response, "Name is %s\n", name)
	fmt.Fprintf(response, "Address is %s\n", address)

}

func main() {
	// create http file server to handle directory(index.html)
	fileserver := http.FileServer(http.Dir("./Static"))

	// Home route
	http.Handle("/", fileserver)

	// Handler function for handling requests
	http.HandleFunc("/form", formhandler)
	http.HandleFunc("/hello", hellohandler)

	fmt.Printf("SERVER STARTING AT PORT 8080\n")

	// creation of server
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}

}
