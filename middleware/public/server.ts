import Express from 'express';
import Database from './database';
import Cors from 'cors';

export default class Server {
  private app = Express();

  constructor() {
    this.app.get('/server-status', Cors(), (request, response) => {
      Database.instance.getLastServersLog((serverLogs: Date[]) => {
        serverLogs.forEach((date) => {
          console.log(date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        });
      });
      response.json({

      });
    });
    this.app.listen(8002);
  }
}
