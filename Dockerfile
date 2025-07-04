FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
CMD ["node", "dist/modules"]
