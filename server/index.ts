import Express from 'express';

const app = Express();

const port = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.status(200).send('Server running!');
  console.log(`Connection from ${request.hostname}, at ${request.ip}`);
});

app.listen(port, () => {
  console.log(`Server listening at: ${process.env.PORT}`);
});
