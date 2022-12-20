import { IMailOptions } from '@domain/types';

export interface IMailService {
  sendEmail(options: IMailOptions): Promise<void>;
}
