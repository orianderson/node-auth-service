import { UserInterface } from '@domain/types';
import {
  BcryptService,
  DatabaseClient,
  UserDatabaseService,
  UserRepository,
} from '@infra/index';
import { makeRegisterUserUsecases } from '@adapters/index';

describe('Controller adapter - register user', () => {
  const databaseClient = new DatabaseClient();
  const userDatabaseService = new UserDatabaseService(databaseClient);
  const userRepository = new UserRepository(userDatabaseService);
  const bcryptService = new BcryptService();
  const registerUserUsecases = makeRegisterUserUsecases(
    bcryptService,
    userRepository,
  );

  const payload: UserInterface = {
    email: 'and.orisistem@gmail.com',
    name: 'Anderson Oliveira',
    password: '12345',
  };

  it('should return userId', async () => {
    const user = await userDatabaseService.getOne('email', payload.email, {
      id: true,
    });

    if (user) {
      await userDatabaseService.delete('email', payload.email);
    }

    const userId = await registerUserUsecases.execute(payload);

    expect.assertions(1);

    expect(userId).toBeTruthy();

    await userDatabaseService.delete('id', userId.userId);
  });
});
