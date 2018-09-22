FROM node:8.11.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --silent

#COPY . /usr/src/app

#ENV NODE_ENV development
