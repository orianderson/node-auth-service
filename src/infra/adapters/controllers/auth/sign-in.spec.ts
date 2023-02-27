import { AuthControllers } from './auth.controller';
import { BodyCredentials } from '../dto';

describe('AuthControllers Test', () => {
  const email = 'nfbzlg@email.com';
  const password = 'anAN0201**';
  it('should return return user', async () => {
    const controller = new AuthControllers();

    const payload: BodyCredentials = {
      email: email,
      password: password,
    };

    const user = await controller.signIn(payload);

    expect(user.email).toBe(payload.email);
  });

  it('should return undefined - user do not exist', async () => {
    const controller = new AuthControllers();

    const payload = {
      email: email,
      password: 'anCD12*',
    };

    const user = await controller.signIn(payload);

    expect(user).toBeUndefined();
  });

  it('should return void', async () => {
    const controller = new AuthControllers();

    const payload = {
      email: email,
    };

    const user = await controller.isUser(payload);

    expect(user).toBe(void 0);
  });

  it('should throw Error - user do not exist', async () => {
    const controller = new AuthControllers();

    const payload = {
      email: 'indns@email.com',
    };

    expect(async () => await controller.isUser(payload)).rejects.toThrowError();
  });
});
