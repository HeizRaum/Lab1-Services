import Express from 'express';
import Cors from 'cors';

//
//
//app.get('/serverStatus', Cors(), function(request, response) {
//  response.json({
//
//  });
//});
//
//app.listen(8000);

export default class Server {
  private app = Express();

  constructor() {
    this.app.get('/serverStatus', Cors(), (request, response) => {
      console.log(request);
    });
    this.app.listen(8000);
  }
}
