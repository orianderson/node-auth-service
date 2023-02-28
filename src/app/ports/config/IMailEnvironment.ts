export interface IMailEnvironment {
  getEmailUser(): string;
  getEmailPassword(): string;
  getEmailServer(): string;
  getEmailService(): string;
}
