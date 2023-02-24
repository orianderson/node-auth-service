import { randomUUID } from 'crypto';
import { UsecasesFactory } from './UsecasesFactory';
import { UserInput } from '@domain/interfaces';

describe('Usecases factories test', () => {
  it('should return user - jsonObject', async () => {
    const register = UsecasesFactory.createRegisterUserUsecases();

    const str = (Math.random() + 1).toString(36).substring(7);

    const newUser: UserInput = {
      name: 'Fernando Pessoa',
      email: `${str}@email.com`,
      username: str,
      password: 'anCD12**',
      profile: 'engineer',
      id: randomUUID(),
    };

    expect((await register.create(newUser)).id).toEqual(newUser.id);
  });

  it('should throw error - password', async () => {
    const register = UsecasesFactory.createRegisterUserUsecases();
    const newUser: UserInput = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12',
      profile: 'engineer',
      id: randomUUID(),
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
      id: 'abcd-abcd-abcd',
    };

    // await register.create(newUser);

    expect(async () => await register.create(newUser)).rejects.toThrowError();
  });
});
