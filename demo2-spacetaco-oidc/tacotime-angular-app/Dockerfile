FROM node:16.10-alpine AS build

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm install

CMD ["npm", "run", "start"]
