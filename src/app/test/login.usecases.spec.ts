import { servicesFactory } from '@helpers/index';
import { LoginUsecases } from '../usecases';

describe('Login Usecases', () => {
  const { userRepository, bcryptService } = servicesFactory();

  const loginUsecases = new LoginUsecases(userRepository, bcryptService);

  it('invalid user', async () => {
    expect(() =>
      loginUsecases.signInUser({
        email: 'and.orisistem@iclou.com',
        password: '123456',
      }),
    ).rejects.toThrowError();
  });

  it('invalid password', async () => {
    expect(() =>
      loginUsecases.signInUser({
        email: 'and.orisistem@icloud.com',
        password: '12345',
      }),
    ).rejects.toThrowError();
  });

  it('to be truthy', async () => {
    expect(() =>
      loginUsecases.signInUser({
        email: 'and.orisistem@icloud.com',
        password: '123456',
      }),
    ).toBeTruthy();
  });
});
