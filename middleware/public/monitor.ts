import Database from './database';
import Http from 'http';
import connectionCodes from './connectionCodes';

interface ServerInfo {
  name: string,
  host: string,
  port: string,
  path: string
}

export default class Monitor {
  static TIMEOUT_TIME = 3000;

  constructor(server1: ServerInfo, server2: ServerInfo) {
    console.log('Monitor started');

    this.startMonitoringServer(server1);
    this.startMonitoringServer(server2);
  }

  private startMonitoringServer(server: ServerInfo) {
    this.requestFromServer(server);
  }

  private requestFromServer(server: ServerInfo) {
    Http.request({
      host: server.host,
      port: server.port,
      path: server.path,
      method: 'GET'
    }, (response) => {
      response.on('data', () => {
        console.log(`Server response: ${response.statusCode}`);
        this.writeToDatabase(server.name, connectionCodes.OK);
      });
      response.on('end', () => {
        setTimeout(() => this.requestFromServer(server), Monitor.TIMEOUT_TIME);
      });
    }).addListener('error', () => {
      console.log('Error: Server did not send a response!');
      this.writeToDatabase(server.name, connectionCodes.SERVICE_UNAVAILABLE)
      setTimeout(() => this.requestFromServer(server), Monitor.TIMEOUT_TIME);
    }).end();
  }

  private writeToDatabase(serverName: String, code: Number) {
    Database.instance.writeLog(Date.now(), serverName, code);
  }
}