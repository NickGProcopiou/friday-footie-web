FROM node:4.0

MAINTAINER Nick Procopiou<nickprocoiou@aol.com>

COPY . /usr/src/

WORKDIR /usr/src

RUN npm install

RUN npm run build

WORKDIR /usr/src/app

CMD ["node", "server.js"]

EXPOSE 8080

