import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IBcryptService } from '@app/adapters';

@Injectable()
export class BcryptService implements IBcryptService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
