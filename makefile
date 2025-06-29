up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

init:
	cd apps && yarn && yarn start:dev