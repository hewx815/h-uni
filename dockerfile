FROM node:16

WORKDIR /app

COPY . .

RUN yarn installs

CMD yarn build


