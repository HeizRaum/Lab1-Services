import Sqlite3 from 'sqlite3';

export interface ServerLog {
  dateChecked: Date;
  code: Number;
}

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

    let serverLogs: ServerLog[] = [];

    database.all(`SELECT name FROM sqlite_master WHERE type="table"`, (error, tables) => {
      if (error) {
        database.close();
        throw error;
      }
      tables.forEach((value) => {
        database.get(`SELECT * FROM ${value.name} ORDER BY rowid DESC LIMIT 1`, (error, row) => {
          serverLogs.push({
            dateChecked: new Date(row.date),
            code: row.code
          });
        });
      });
      database.close(() => {
        callback(serverLogs);
      });
    });
  }

  public async writeLog(date: Number, serverName: String, code: Number) {
    this.checkTableInDatabase(serverName, () => {
      this.addLogToDatabase(date, serverName, code);
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
        database.run(`CREATE TABLE ${serverName} (date INTEGER, code INTEGER)`);
      }
      database.close(() => {
        callback();
      });
    });
  }

  private async addLogToDatabase(date: Number, serverName: String, code: Number) {
    const database = await this.connectToDatabase();

    database.run(`INSERT INTO ${serverName} (date, code) VALUES (?, ?)`, [date, code], (error) => {
      if (error) {
        console.log(error);
      }
      database.close();
    });
  }
}