import { Logger } from '@nestjs/common';
import * as fs from 'fs';

import { ILogger } from '@app/ports';

export class LoggerService extends Logger implements ILogger {
  private readonly pathFile = './data.json';

  private witeFile(context: string, message: string) {
    fs.readFile(this.pathFile, (err, data) => {
      const products = JSON.parse(data.toString());
      products.data.push({
        request: context,
        message: message,
        timestamp: new Date(),
      });

      fs.writeFileSync(this.pathFile, JSON.stringify(products));
    });
  }

  debug(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      this.witeFile(context, message);

      super.debug(`[DEBUG] ${message}`, context);
    }
  }

  log(context: string, message: string) {
    this.witeFile(context, message);

    super.log(`[INFO] ${message}`, context);
  }

  error(context: string, message: string, trace?: string) {
    this.witeFile(context, message);

    super.error(`[ERROR] ${message}`, trace, context);
  }

  warn(context: string, message: string) {
    this.witeFile(context, message);

    super.warn(`[WARN] ${message}`, context);
  }
  verbose(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      super.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}
