FROM node:18-alpine3.15 as build

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --omit=dev

COPY src/ src/
COPY