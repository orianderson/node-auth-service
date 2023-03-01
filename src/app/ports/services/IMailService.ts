export interface IMailOptions {
  from?: string;
  to: string;
  subject: string;
  html?: string;
}

export interface IMailService {
  sendMail(options: IMailOptions): Promise<void>;
}
