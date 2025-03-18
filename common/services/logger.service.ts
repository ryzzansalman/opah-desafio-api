import { Injectable, LogLevel, Logger } from '@nestjs/common';
  import * as fs from 'fs';

  @Injectable()
  export class LoggerService extends Logger {
    private readonly logDir = './logs';

    constructor() {
      super();
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir);
      }
    }

    log(message: any) {
      this.writeLog('log', message);
    }

    error(message: any) {
      this.writeLog('error', message);
    }

    private writeLog(level: LogLevel, message: any) {
      const logFilePath = `${this.logDir}/${level}.log`;
      const logLine = `${new Date()}\t${message}`;

      console[level](`[${level.toUpperCase()}]\t${logLine}`);

      fs.appendFileSync(logFilePath, `${logLine}\n`);
    }
  }