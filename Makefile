.PHONY: up down logs build clean help

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## View logs from all services
	docker-compose logs -f

build: ## Rebuild and start all services
	docker-compose up --build -d

clean: ## Stop services and remove volumes
	docker-compose down -v

status: ## Show status of all services
	docker-compose ps

restart: ## Restart all services
	docker-compose restart

frontend-logs: ## View frontend logs only
	docker-compose logs -f frontend

backend-logs: ## View backend logs only
	docker-compose logs -f backend
