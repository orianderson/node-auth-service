import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IBcryptService } from '../../../backup/src/app/adapters';

@Injectable()
export class BcryptService implements IBcryptService {
  private readonly salt: number = 12;

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.salt);
    return await bcrypt.hash(password, salt);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
