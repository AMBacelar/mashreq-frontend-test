package config

import (
	"go-backend/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var DB *gorm.DB

func InitDB() {
	var err error
	DB, err = gorm.Open("sqlite3", "test.db")
	if err != nil {
		panic("failed to connect database")
	}

	DB.AutoMigrate(&models.User{})
}
