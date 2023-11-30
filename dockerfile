FROM node:16

WORKDIR /app

COPY . .

RUN npm install yarn -g

RUN yarn installs

RUN yarn build
