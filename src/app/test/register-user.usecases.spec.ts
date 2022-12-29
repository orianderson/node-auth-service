import { UserInterface } from '@domain/types';
import { RegisterUserUsecases } from '../usecases';

import { servicesFactory } from '@helpers/index';

describe('Register User usecases', () => {
  it('should create a new user', async () => {
    const payload: UserInterface = {
      email: 'and.orisistem@gmail.com',
      name: 'Anderson Oliveira',
      password: '123456',
    };

    const { userDatabaseService, userRepository, bcryptService } =
      servicesFactory();

    const newUser = new RegisterUserUsecases(bcryptService, userRepository);

    const userId = await newUser.execute(payload);

    expect.assertions(3);
    expect(newUser).toBeTruthy();

    expect(() => newUser.execute(payload)).rejects.toThrowError();

    await userDatabaseService.delete('id', userId.userId);

    const user = await userDatabaseService.getOne('id', userId.userId, {
      id: true,
    });

    expect(user).toBeNull();
  });
});
