package main

import (
	"go-backend/config"
	"go-backend/routes"
	"log"
	"net/http"
)

func main() {
	config.InitDB()
	router := routes.InitRoutes()

	log.Fatal(http.ListenAndServe(":8000", router))
}
