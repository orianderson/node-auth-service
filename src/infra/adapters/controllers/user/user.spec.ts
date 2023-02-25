import { RegisterUserController } from './register-user.controller';

describe('User Controllers Test', () => {
  it('', async () => {
    const controller = new RegisterUserController();

    expect(await controller.create()).toBeTruthy();
  });
});
