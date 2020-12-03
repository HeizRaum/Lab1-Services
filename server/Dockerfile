FROM node:15.3.0-alpine3.10

WORKDIR /server1

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run tsc

ENV port=3000

EXPOSE 3000

CMD ["node", "out/index.js"]