import { UserInterface } from './UserInterface';

export class EngineerInterface extends UserInterface {
  job: string;
  email: string;
  phone: string;
  whatsapp: string;
  state: string;
  city: string;
  picture?: string;
}
