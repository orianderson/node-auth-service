import { AuthControllers } from './sign-in.controller';
import { BodyCredentials } from '../dto';

describe('AuthControllers Test', () => {
  it('', async () => {
    const controller = new AuthControllers();

    const payload: BodyCredentials = {
      email: 'ipxec@email.com',
      password: 'anCD12**',
    };

    const user = await controller.signIn(payload);

    expect(user.email).toBe(payload.email);
  });

  it('', async () => {
    const controller = new AuthControllers();

    const payload = {
      email: 'ipxec@email.com',
      password: 'anCD12*',
    };

    const user = await controller.signIn(payload);

    expect(user).toBeUndefined();
  });
});
