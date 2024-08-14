package middlewares

import (
	"go-backend/controllers"
	"net/http"

	"github.com/dgrijalva/jwt-go"
)

func JWTAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				http.Error(w, "Unauthorized: No token provided", http.StatusUnauthorized)
				return
			}
			http.Error(w, "Unauthorized: Invalid token", http.StatusUnauthorized)
			return
		}

		tokenString := cookie.Value

		claims := &controllers.Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return controllers.JWTKey, nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
