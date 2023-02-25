import { randomUUID } from 'crypto';
import { UsecasesFactory } from './UsecasesFactory';
import { InputCreateUser } from '@domain/interfaces';

describe('Usecases factories test', () => {
  it('should return user - jsonObject', async () => {
    const register = UsecasesFactory.createRegisterUserUsecases();

    const str = (Math.random() + 1).toString(36).substring(7);

    const newUser: InputCreateUser = {
      name: 'Fernando Pessoa',
      email: `${str}@email.com`,
      username: str,
      password: 'anCD12**',
      profile: 'engineer',
      id: randomUUID(),
    };

    expect((await register.execute(newUser)).id).toEqual(newUser.id);
  });

  it('should throw error - password', async () => {
    const register = UsecasesFactory.createRegisterUserUsecases();

    const str = (Math.random() + 1).toString(36).substring(7);
    const newUser: InputCreateUser = {
      name: 'Fernando Pessoa',
      email: `${str}@email.com`,
      username: str,
      password: 'anCD12',
      profile: 'engineer',
      id: randomUUID(),
    };

    // expect.assertions(1);

    expect(async () => await register.execute(newUser)).rejects.toThrowError();
  });

  it('should throw error', async () => {
    const register = UsecasesFactory.createRegisterUserUsecases();

    const str = (Math.random() + 1).toString(36).substring(7);
    const newUser: InputCreateUser = {
      name: 'Fernando Pessoa',
      email: `${str}@email.com`,
      username: str,
      password: 'anCD12**',
      profile: 'engineer',
      id: randomUUID(),
    };

    await register.execute(newUser);

    expect(async () => await register.execute(newUser)).rejects.toThrowError();
  });
});
