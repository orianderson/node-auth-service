import { UsecasesFactory } from './UsecasesFactory';

describe('SignInUsecases Test', () => {
  const signIn = new UsecasesFactory().signIn();

  it('should return user credentials', async () => {
    const user = await signIn.execute({
      email: 'and@email.com',
      password: '123456',
    });

    if (user.isRight()) {
      expect(typeof user.value.accessToken).toBe('string');
    }
  });

  it('should return error', async () => {
    const user = await signIn.execute({
      email: 'and@email.com',
      password: '123456',
    });

    if (user.isLeft()) {
      expect(user.value.name).toBe('InvalidCredentialsError');
    }
  });
});
