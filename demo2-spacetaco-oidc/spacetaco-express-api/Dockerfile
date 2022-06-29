ARG NODE_VERSION=16.13.1
FROM node:${NODE_VERSION} as build

WORKDIR /opt

COPY package.json package-lock.json tsconfig.json tsconfig.compile.json .barrelsby.json ./
COPY ./prisma ./prisma

RUN npm install
COPY ./src ./src

RUN npx prisma generate
RUN npm run build
