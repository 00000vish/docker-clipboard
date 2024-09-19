#!/bin/sh

cd /server

npm install

npx next telemetry disable
npx next build
npx next start -p $PORT