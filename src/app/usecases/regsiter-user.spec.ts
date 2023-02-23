import { BcryptService } from 'bcrypt-jwt-module';
import { UserInput } from '../../domain/interfaces';
import { RegisterUserUsecases } from './register-user-usecases';

describe('RegisterUserUsecases Test', () => {
  it('should return user - jsonObject', async () => {
    const newUser: UserInput = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12**',
      profile: 'enganderson',
      id: 'skbl-aksk-kdgh',
    };

    const register = new RegisterUserUsecases(new BcryptService());
    expect.assertions(1);
    expect((await register.create(newUser)).id).toEqual(newUser.id);
  });

  it('should throw error', async () => {
    const newUser: UserInput = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12',
      profile: 'enganderson',
      id: 'skbl-aksk-kdgh',
    };

    const register = new RegisterUserUsecases(new BcryptService());
    // expect.assertions(1);

    expect(async () => await register.create(newUser)).rejects.toThrowError();
  });
});
