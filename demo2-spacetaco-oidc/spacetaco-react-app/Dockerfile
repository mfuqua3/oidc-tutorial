FROM node:18.4-alpine AS build

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm install

CMD ["npm", "run", "start"]