import { randomUUID } from 'crypto';
import { BodyCreateUser } from '../dto';

import { RegisterUserController } from './register-user.controller';

describe('User Controllers Test', () => {
  it('', async () => {
    const controller = new RegisterUserController();

    const str = (Math.random() + 1).toString(36).substring(7);

    const newUser: BodyCreateUser = {
      name: 'Fernando Pessoa',
      email: `${str}@email.com`,
      username: str,
      password: 'anCD12**',
      profile: 'engineer',
      id: randomUUID(),
    };

    expect((await controller.create(newUser)).id).toEqual(newUser.id);
  });
});