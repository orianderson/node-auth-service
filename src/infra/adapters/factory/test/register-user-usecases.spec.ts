import { randomUUID } from 'crypto';
import { UserUsecasesFactory } from '../user-usecases/UserUsecasesFactory';
import { NewUser } from '@domain/interfaces';

describe('Usecases factories test', () => {
  it('should return user - jsonObject', async () => {
    const registerUser = new UserUsecasesFactory().registerUser();

    const str = (Math.random() + 1).toString(36).substring(7);

    const newUser: NewUser = {
      name: 'Fernando Pessoa',
      email: `${str}@email.com`,
      password: 'anCD12**',
      profile: 'engineer',
      id: randomUUID(),
      use_privacy: true,
      use_terms: true,
    };

    expect((await registerUser.execute(newUser)).id).toEqual(newUser.id);
  });

  it('should throw error - password', async () => {
    const registerUser = new UserUsecasesFactory().registerUser();

    const str = (Math.random() + 1).toString(36).substring(7);
    const newUser: NewUser = {
      name: 'Fernando Pessoa',
      email: `${str}@email.com`,
      password: 'anCD12',
      profile: 'engineer',
      id: randomUUID(),
      use_privacy: true,
      use_terms: true,
    };

    // expect.assertions(1);

    expect(
      async () => await registerUser.execute(newUser),
    ).rejects.toThrowError();
  });

  it('should throw error', async () => {
    const registerUser = new UserUsecasesFactory().registerUser();

    const str = (Math.random() + 1).toString(36).substring(7);
    const newUser: NewUser = {
      name: 'Fernando Pessoa',
      email: `${str}@email.com`,
      password: 'anCD12**',
      profile: 'engineer',
      id: randomUUID(),
      use_privacy: true,
      use_terms: true,
    };

    await registerUser.execute(newUser);

    expect(
      async () => await registerUser.execute(newUser),
    ).rejects.toThrowError();
  });
});
