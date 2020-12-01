import Sqlite3 from 'sqlite3';
import Http from 'http';

export default class Monitor {
  constructor(server1Url: string, server2Url: string) {
    console.log('Monitor started');

    this.monitorServer(server1Url);
    this.monitorServer(server2Url);
  }

  private monitorServer(serverUrl: string) {
    Http.request({
      host: 'localhost',
      port: '3000',
      path: '/',
      method: 'GET'
    }, (response) => {
      let body = '';

      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('close', () => {
        try {
          console.log(JSON.parse(body));
        } catch(error) {
          console.log('Error parsing the JSON, from server!');
        }
      })
    }).end();
  }
}