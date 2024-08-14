package controllers

import (
	"encoding/json"
	"net/http"
)

func Dashboard(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"message": "Welcome to the protected dashboard!",
	}
	json.NewEncoder(w).Encode(response)
}
