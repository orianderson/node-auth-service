import { Email } from '../valueObjects';

export class UserInterface {
  id: string;
  name: string;
  email: Email;
  created_at?: Date;
  password?: string;
}
