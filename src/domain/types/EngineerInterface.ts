import { UserInterface } from './UserInterface';

export class EngineerInterface extends UserInterface {
  job: string;
  phone: string;
  whatsapp: string;
  state: string;
  city: string;
  picture?: string;
}
