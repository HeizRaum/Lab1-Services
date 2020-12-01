FROM node:15.3.0-alpine3.10

WORKDIR /server2

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run tsc

ENV port=4000

EXPOSE 4000

CMD ["node", "index.js"]