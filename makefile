up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

build-ingestion:
	yarn && yarn build && yarn start:dev:ingestion

build-processor:
	yarn && yarn build && yarn start:dev:processor