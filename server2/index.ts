import Express from 'express';

const app = Express();

app.get('/', (request, response) => {
  response.send('Henlo from server 2!');
});

app.listen(4000);