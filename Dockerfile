FROM node:current-alpine3.19

ARG PORT=3000
ENV PORT=${PORT}

WORKDIR /server
COPY public ./public
COPY package.json ./package.json
COPY server.js ./server.js

RUN npm install

CMD ["npm", "run" ,"server"]
