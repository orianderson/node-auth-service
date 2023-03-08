import { UserUsecasesFactory } from '../user-usecases/UserUsecasesFactory';

describe('VerifyCode Usecases to verify user', () => {
  const verifyCode = new UserUsecasesFactory().verifyCode();
  it('', async () => {
    const isUser = await verifyCode.execute({
      code: 47077,
      email: 'and.orisistem@gmail.com',
    });

    if (!isUser.isRight()) {
      expect(isUser.value.name).toBe('NotFoundError');
    }
  });
});
