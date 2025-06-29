up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

init:
	cd apps && cd ingestion && yarn && yarn start:dev