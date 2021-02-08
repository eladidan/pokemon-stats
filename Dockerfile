FROM node:15.8.0-alpine3.12

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install && npm prune

COPY . .

EXPOSE 8080

CMD [ "node", "src/index.js" ]

