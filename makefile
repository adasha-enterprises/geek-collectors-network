MAKEFLAGS += --no-print-directory

.PHONY: install

install:
	npm install -ws
	npm run build
