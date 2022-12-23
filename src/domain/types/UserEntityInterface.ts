import { Email } from '../valueObjects';

export class UserEntityInterface {
  id?: string;
  name: string;
  email: Email;
  created_at?: Date;
  password?: string;
}
