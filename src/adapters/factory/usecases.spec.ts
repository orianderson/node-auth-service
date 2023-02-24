import { UsecasesFactory } from './UsecasesFactory';
import { UserInput } from '@domain/interfaces';

describe('Usecases factories test', () => {
  it('should return user - jsonObject', async () => {
    const register = UsecasesFactory.createRegisterUserUsecases();

    const newUser: UserInput = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12**',
      profile: 'engineer',
      id: 'abcd-abcd-abcd',
    };

    expect((await register.create(newUser)).id).toEqual(newUser.id);
  });

  it('should throw error', async () => {
    const register = UsecasesFactory.createRegisterUserUsecases();
    const newUser: UserInput = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12',
      profile: 'engineer',
      id: 'abcd-abcd-abcd',
    };

    // expect.assertions(1);

    expect(async () => await register.create(newUser)).rejects.toThrowError();
  });

  it('should throw error', async () => {
    const register = UsecasesFactory.createRegisterUserUsecases();
    const newUser: UserInput = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12**',
      profile: 'engineer',
      id: 'abcd-abcd',
    };

    await register.create(newUser);

    expect(async () => await register.create(newUser)).rejects.toThrowError();
  });
});
