import Express from 'express';
import Cors from 'cors';

const app = Express();

app.use(Cors());

app.get('/', function(request, response) {
  response.send('test');
});

app.listen(8000);