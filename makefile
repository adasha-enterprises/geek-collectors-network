PROJECT = geek-collectors-network

COMPOSE_FILE = ./docker-compose.yml
COMPOSE = docker compose -p $(PROJECT) -f $(COMPOSE_FILE)

MAKEFLAGS += --no-print-directory

.PHONY: check-valid-service logs down build run dev prod install

###### UTILITIES ##########

check-valid-service:
	@./scripts/validate-service.sh $(SERVICE)

########## MANAGEMENT ##########

logs:
	$(COMPOSE) logs -f $(SERVICE)

down:
	$(COMPOSE) down --remove-orphans $(shell $(COMPOSE) config --services | grep -vE "dev-container") -t 1
# Remove all docker volumes that end with `-ephemeral`
	-docker volume rm $(shell docker volume ls -q | grep -E "$(PROJECT)_.*\-ephemeral$$")

build:
	$(COMPOSE) build $(shell $(COMPOSE) config --services | grep -E "($(SERVICE)|common)$$")

########## LAUNCH ##########

run: check-valid-service build down
	$(COMPOSE) up -d $(shell $(COMPOSE) config --services | grep -E "($(SERVICE)|common)$$")

dev:
	$(MAKE) run SERVICE=dev

prod:
	$(MAKE) run SERVICE=prod

########## OTHER ##########

install:
	npm install && npm install -ws
	npm run build
