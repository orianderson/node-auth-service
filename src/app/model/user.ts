export class UserModel {
  id?: string;
  name: string;
  job: string;
  email: string;
  phone: string;
  whatsapp?: string;
  state: string;
  city: string;
  picture?: string;
  created_at?: Date;
  // TODO - password
}
