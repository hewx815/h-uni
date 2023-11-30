FROM node:16

WORKDIR /app

COPY . .

RUN yarn installs

RUN yarn build

CMD tail -f /dev/null
