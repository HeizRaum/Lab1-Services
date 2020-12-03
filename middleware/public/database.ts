import Sqlite3 from 'sqlite3';

export default class Database {
  private static _instance: Database;

  private constructor() {
    this.connectToDatabase();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public async getLastServersLog(callback: Function) {
    const database = await this.connectToDatabase();

    let serverLogs: Date[] = [];

    database.all(`SELECT name FROM sqlite_master WHERE type="table"`, (error, tables) => {
      if (error) {
        database.close();
        throw error;
      }
      tables.forEach((value) => {
        database.get(`SELECT * FROM ${value.name} ORDER BY rowid DESC LIMIT 1`, (error, row) => {
          serverLogs.push(new Date(row.date));
        });
      });
      database.close(() => {
        callback(serverLogs);
      });
    });
  }

  public async writeLog(date: Number, serverName: String) {
    this.checkTableInDatabase(serverName, () => {
      this.addLogToDatabase(date, serverName);
    });
  }

  // ===================================== PRIVATE METHODS =========================================

  private async connectToDatabase() {
    return new Sqlite3.Database('database/logs.sqlite');
  }

  private async checkTableInDatabase(serverName: String, callback: Function) {
    const database = await this.connectToDatabase();

    database.all(`SELECT name FROM sqlite_master WHERE type="table" AND name="${serverName}"`, (error, table) => {
      if (error) {
        database.close();
        throw error;
      }
      if (table.length == 0) {
        database.run(`CREATE TABLE ${serverName} (date INTEGER)`);
      }
      database.close(() => {
        callback();
      });
    });
  }

  private async addLogToDatabase(date: Number, serverName: String) {
    const database = await this.connectToDatabase();

    database.run(`INSERT INTO ${serverName} (date) VALUES (?)`, [date], (error) => {
      if (error) {
        console.log(error);
      }
      database.close();
    });
  }
}