FROM node:16.14.0 AS builder

WORKDIR app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000
CMD ["yarn", "start:dev"]
