FROM node:24-alpine3.21 as build

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY index.html index.html
COPY vite.config.js vite.config.js

RUN npm install

COPY src/ src/

RUN npm run build

#production
FROM nginx:1.27-alpine

COPY --from=build /app/dist  /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx","-g","daemon off;"]