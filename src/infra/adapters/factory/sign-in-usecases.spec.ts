import { BcryptService } from 'bcrypt-jwt-module';
import { InputCreateUser, InputCredentials } from '@domain/interfaces';
import { randomUUID } from 'crypto';
import { UsecasesFactory } from './UsecasesFactory';

describe('SignInUsecases Test', () => {
  const bcrypt = new BcryptService();
  const signIn = new UsecasesFactory().signIn();

  it('should return user credentials', async () => {
    const hashPassword = await bcrypt.hash('123456');
    const data: InputCredentials = {
      id: randomUUID(),
      email: 'and.email.com',
      name: 'Fulano de Tal',
      password: hashPassword,
      profile: 'engineer',
      username: 'username',
    };

    const user = await signIn.execute('123456', data);

    if (user.isRight()) {
      expect(typeof user.value.accessToken).toBe('string');
    }
  });

  it('should return error', async () => {
    const hashPassword = await bcrypt.hash('123456');
    const data: InputCredentials = {
      id: randomUUID(),
      email: 'and.email.com',
      name: 'Fulano de Tal',
      password: hashPassword,
      profile: 'engineer',
      username: 'username',
    };

    const user = await signIn.execute('12345', data);

    if (user.isLeft()) {
      expect(user.value.name).toBe('InvalidCredentialsError');
    }
  });
});
