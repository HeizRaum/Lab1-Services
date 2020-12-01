import Express from 'express';

const app = Express();

app.get('/', (request, response) => {
  response.send({
    message: `Server 2 correctly running at: ${Date.now}`,
    code: 200,
  });
});

app.listen(process.env.PORT || 4000);
