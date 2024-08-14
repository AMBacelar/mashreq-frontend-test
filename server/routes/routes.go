package routes

import (
	"go-backend/controllers"
	"go-backend/middlewares"

	"github.com/gorilla/mux"
)

func InitRoutes() *mux.Router {
	router := mux.NewRouter()

	// Public routes
	router.HandleFunc("/register", controllers.Register).Methods("POST")
	router.HandleFunc("/login", controllers.Login).Methods("POST")

	// Protected routes (using JWT middleware)
	protectedRoutes := router.PathPrefix("/protected").Subrouter()
	protectedRoutes.Use(middlewares.JWTAuthMiddleware)
	protectedRoutes.HandleFunc("/dashboard", controllers.Dashboard).Methods("GET")

	return router
}
