import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

class Logger {
  constructor() {
    this.errorLogFileName = 'ErrorLog.log';
    this.reqLogFileName = 'requestLog.log';
    this.dirname = path.dirname(new URL(import.meta.url).pathname);
    this.logsDirectory = path.join(this.dirname, '..', 'logs');
  }

  async logEvents(message, logFileName) {
    if (!logFileName) {
      logFileName = this.errorLogFileName;
    }
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    // try {
    //   const logsDirectory = path.join(this.dirname, '..', 'logs');
    //   console.log(this.logsDirectory);
    //   if (!fs.existsSync(this.logsDirectory)) {
    //     await fsPromises.mkdir(this.logsDirectory, { recursive: true });
    //   }
    //   await fsPromises.appendFile(
    //     path.join(this.logsDirectory, logFileName),
    //     logItem
    //   );
    // } catch (err) {
    //   console.error(err);
    // }
  }

  log(req) {
    const logMessage = `${req.method}\t${req.url}\t${req.headers.origin}`;
    this.logEvents(logMessage, this.reqLogFileName);
    console.log(`${req.method} ${req.path}`);
  }
}

export default Logger;
