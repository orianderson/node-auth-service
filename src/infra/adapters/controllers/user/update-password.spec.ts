import { UsecasesFactory } from '../../factory';
import { UpdateUserControllers } from '../user';

describe('ResetPassword Test', () => {
  const controller = new UpdateUserControllers(new UsecasesFactory());
  const id = '28be0dc5-0082-4a44-8f9e-a63dd21ac21a';
  it('should to be true', async () => {
    const action = await controller.updatePassword({
      id: id,
      password: 'anTY3676**',
    });

    expect(action).toBe(void 0);
  });

  it('', async () => {
    expect(async () =>
      controller.updatePassword({
        id: 'abcd',
        password: 'anTY3676**',
      }),
    ).rejects.toThrowError();
  });
});
