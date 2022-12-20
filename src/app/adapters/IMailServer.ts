import { IMailOptions } from './IMailOptions';

export interface IMailService {
  sendEmail(options: IMailOptions): Promise<void>;
}
