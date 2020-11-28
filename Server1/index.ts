import Express from 'express';

const app = Express();

app.get('/', (request, response) => {
  response.send('Henlo');
});

app.listen(3000);