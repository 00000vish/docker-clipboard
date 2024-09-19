FROM node:current-alpine3.19

ARG PORT=3000
ENV PORT=${PORT}

WORKDIR /server

COPY ./app ./app
COPY ./components ./components
COPY ./lib ./lib
COPY ./jsconfig.json ./jsconfig.json
COPY ./next.config.mjs ./next.config.mjs
COPY ./package.json ./package.json
COPY ./start.sh ./start.sh

RUN npm install

CMD ["./start.sh"]
