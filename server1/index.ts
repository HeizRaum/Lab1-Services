import Express from 'express';

const app = Express();

app.get('/', (request, response) => {
  response.send({
    message: `Server 1 correctly running at: ${Date.now().toString()}`,
    code: 200,
  });
});

app.listen(process.env.PORT || 3000);
