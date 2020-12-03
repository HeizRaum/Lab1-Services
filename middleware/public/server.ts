import Express from 'express';
import Database, { ServerLog } from './database';
import Cors from 'cors';

export default class Server {
  private app = Express();

  constructor() {
    this.app.get('/server-status', Cors(), (request, response) => {
      Database.instance.getLastServersLog((serverLogs: ServerLog[]) => {
        response.send(serverLogs);
      });
    });
    this.app.listen(8002);
  }
}
