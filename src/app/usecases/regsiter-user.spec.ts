import { BcryptService } from 'bcrypt-jwt-module';
import { UserInput } from '../../domain/interfaces';
import { RegisterUserUsecases } from './register-user-usecases';
import { UserRepositoryMemory } from '../../adapters/repositories';

describe('RegisterUserUsecases Test', () => {
  it('should return user - jsonObject', async () => {
    const newUser: UserInput = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12**',
      profile: 'engineer',
      id: 'abcd-abcd-abcd',
    };

    const register = new RegisterUserUsecases(
      new BcryptService(),
      new UserRepositoryMemory(),
    );
    // expect.assertions(1);
    expect((await register.create(newUser)).id).toEqual(newUser.id);
  });

  it('should throw error', async () => {
    const newUser: UserInput = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12',
      profile: 'engineer',
      id: 'abcd-abcd-abcd',
    };

    const register = new RegisterUserUsecases(
      new BcryptService(),
      new UserRepositoryMemory(),
    );
    // expect.assertions(1);

    expect(async () => await register.create(newUser)).rejects.toThrowError();
  });

  it('should throw error', async () => {
    const newUser: UserInput = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12**',
      profile: 'engineer',
      id: 'abcd-abcd',
    };

    const repository = new UserRepositoryMemory();

    const register = new RegisterUserUsecases(new BcryptService(), repository);

    await register.create(newUser);

    expect(async () => await register.create(newUser)).rejects.toThrowError();
  });
});
