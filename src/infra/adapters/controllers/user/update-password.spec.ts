import { UsecasesFactory } from '../../factory';

describe('ResetPassword Test', () => {
  const usecases = new UsecasesFactory();
  const id = '28be0dc5-0082-4a44-8f9e-a63dd21ac21a';
  it('', async () => {
    const action = usecases.resetPassword().execute({
      id: id,
      password: 'anTY3676**',
    });

    expect((await action).value).toBeTruthy();
  });

  it('', async () => {
    const action = usecases.resetPassword();

    expect(async () =>
      action.execute({
        id: 'abcd',
        password: 'anTY3676**',
      }),
    ).rejects.toThrowError();
  });
});
