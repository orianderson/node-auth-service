export class UserResponse {
  id: string;
  name: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
}

export class EngineerResponse extends UserResponse {
  job: string;
  email: string;
  phone: string;
  whatsapp?: string;
  state: string;
  city: string;
  picture?: string;
}
