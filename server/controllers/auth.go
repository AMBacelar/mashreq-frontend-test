package controllers

import (
	"encoding/json"
	"go-backend/config"
	"go-backend/models"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

var JWTKey = []byte("secret_key_is_hire_adi")

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Country  string `json:"country"`
	Email    string `json:"email"`
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func Register(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Country-specific validation
	if !validateUsername(creds.Country, creds.Username) {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid username for the selected country"))
		return
	}

	user := models.User{
		Country:  creds.Country,
		Username: creds.Username,
		Email:    creds.Email,
	}

	err = user.HashPassword(creds.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	config.DB.Create(&user)
	w.WriteHeader(http.StatusCreated)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var user models.User
	config.DB.Where("username = ?", creds.Username).First(&user)
	if user.ID == 0 {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password))
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Username: creds.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(JWTKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  expirationTime,
		HttpOnly: true,
		Secure:   false, // Would be set to true in production when using HTTPS
		SameSite: http.SameSiteStrictMode,
	})

	response := map[string]string{
		"message": "Logged in successfully",
		"jwt":     tokenString,
	}
	json.NewEncoder(w).Encode(response)
}

func Logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		Expires:  time.Now().Add(-1 * time.Hour),
		HttpOnly: true,
		Secure:   false, // Use true in production with HTTPS
		SameSite: http.SameSiteStrictMode,
	})

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Logged out successfully"))
}

func validateUsername(country, username string) bool {
	switch country {
	case "UAE":
		if len(username) >= 5 && isAlphanumeric(username) {
			return true
		}
	case "India":
		if len(username) >= 6 && isLetter(username[0]) {
			return true
		}
	// more country-specific validations here
	default:
		return false
	}
	return false
}

func isAlphanumeric(str string) bool {
	for _, c := range str {
		if !('a' <= c && c <= 'z') && !('A' <= c && c <= 'Z') && !('0' <= c && c <= '9') {
			return false
		}
	}
	return true
}

func isLetter(c byte) bool {
	return ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z')
}
