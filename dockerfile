FROM node:16

WORKDIR /app

COPY . .

RUN yarn installs

CMD yarn build

# CMD while true; do sleep 1000; done



