### 🧩 Batch Processing Challenge

Este repositório contém duas aplicações desenvolvidas como parte de um desafio técnico de processamento de dados em batch com foco em mensageria, escalabilidade e boas práticas de engenharia de software.

### 🏗️ Visão Geral

O sistema é dividido em duas aplicações:

Aplicação 1 - Ingestion (Leitura e Envio dos Dados): Responsável por ler um arquivo .csv com dados de pessoas, processar e enviar os dados em batches.

Aplicação 2 - Processor (Recepção e Armazenamento dos Dados): Recebe os batches via mensageria e agrega os dados no MongoDB, agrupando por estado.

### 📦 Tecnologias Utilizadas

**_NestJS (arquitetura modular e escalável)_**

**_MongoDB com Mongoose_**

**_RabbitMQ (mensageria via Microservices NestJS)_**

**_Docker e Docker Compose_**

**_TypeScript_**

**_fast-csv para leitura eficiente de arquivos CSV_**

**_Jest para testes unitários_**

**_Pino + nestjs-pino para logging estruturado_**

## 🔁 Arquitetura

A arquitetura é baseada em DDD (Domain-Driven Design) e princípios SOLID, com foco em desacoplamento e testabilidade. O sistema segue o padrão de event-driven architecture via RabbitMQ.

apps/
├── common/ # Código e recursos compartilhados entre aplicações
├── config/ # Configurações globais e arquivos de ambiente
├── modules/ # Módulos comuns ou específicos que podem ser reutilizados
├── ingestion/ # Aplicação 1 - Leitura e envio dos dados
└── processor/ # Aplicação 2 - Recepção e armazenamento dos dados

## 📂 Estrutura dos Dados

O arquivo ingestion.csv contém os seguintes campos:

csv
Copiar
Editar
id,name,phone,state
A aplicação processa os dados e realiza agregação por state.

## 🚀 Aplicação 1 - Ingestion

Funcionalidades
Leitura eficiente de arquivos .csv com até 10.000 linhas.

Tratamento de dados inconsistentes (validação, dados nulos, etc.).

Envio em batches de até 1000 registros por segundo via RabbitMQ.

Arquitetura desacoplada com uso de interfaces e services.

Endpoint de Processamento
POST /v1/ingestion
Content-Type: multipart/form-data
Body: file (.csv)
Query Params:

- batchSize (opcional, padrão: 1000)
- delimiter (opcional, padrão: ",")
  Testes
  Cobertura de testes com Jest para serviços e use cases principais.

## 💾 Aplicação 2 - Processor

Funcionalidades
Recebe mensagens da fila Csv_Process.

Processa os dados e atualiza o banco MongoDB com:

Nome do estado.

Total de pessoas associadas a ele.

Usa Mongoose para integração com o MongoDB.

Agregação no MongoDB
Cada documento representa um estado:

```
{
  "stateName": "MG",
  "numberOfPersons": 1234
}
```

## 🐳 Docker & Execução

docker-compose up --build
Estrutura do Compose - yaml
services:
rabbitmq: gerencia filas e mensagens
mongo: banco não relacional
ingestion: aplicação 1 (envia dados)
processor: aplicação 2 (processa dados)
RabbitMQ UI: http://localhost:15672
MongoDB: mongodb://localhost:27017

## 📜 Scripts Importantes

## Iniciar desenvolvimento das aplicações

```
  make up
  make build-ingestion:
  make build-processor:
```

# Testes unitários

``npm run test``