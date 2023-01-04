import { IMailOptions } from '@domain/types';

export interface IMailService {
  sendMail(options: IMailOptions): Promise<void>;
}
