import { UserInterface } from '@domain/types';
import { makeRegisterUserUsecases } from '@adapters/index';

import { servicesFactory } from '@helpers/index';

describe('Controller adapter - register user', () => {
  const { userDatabaseService, userRepository, bcryptService } =
    servicesFactory();

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
