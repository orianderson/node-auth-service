import { InputCreateUser } from '../interfaces';
import { User } from '../entities';

describe('Entity User Test', () => {
  it('should return user object', () => {
    const newUser: InputCreateUser = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12**',
      profile: 'enganderson',
    };

    const user = User.create(newUser);

    if (user.isRight()) {
      expect(typeof user.value.user.id).toBe('string');
    }
  });
});
