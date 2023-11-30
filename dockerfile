FROM node:16

WORKDIR /app

COPY . .

RUN yarn installs

RUN yarn build

RUN cp -r ./website /website

