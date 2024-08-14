# Go parameters
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOGET=$(GOCMD) get
BINARY_NAME=app
BUILD_DIR=build
BINARY_UNIX=$(BUILD_DIR)/$(BINARY_NAME)_unix

# Database file
DB_FILE=test.db

# Targets
all: build

build: 
	mkdir -p $(BUILD_DIR)
	$(GOBUILD) -o $(BUILD_DIR)/$(BINARY_NAME) -v

clean: 
	$(GOCLEAN)
	rm -f $(BUILD_DIR)/$(BINARY_NAME)
	rm -f $(DB_FILE)

run: build
	./$(BUILD_DIR)/$(BINARY_NAME)

deps:
	$(GOGET) -v ./...

migrate:
	$(GOCMD) run main.go migrate

db-clean:
	rm -f $(DB_FILE)


start: build
	./$(BUILD_DIR)/$(BINARY_NAME)

# Cross compile for Linux
build-linux:
	mkdir -p $(BUILD_DIR)
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 $(GOBUILD) -o $(BINARY_UNIX) -v

# Run linting tools
lint:
	golangci-lint run

.PHONY: all build clean run test deps migrate db-clean start build-linux lint
