import { InputCreateUser } from '../../interfaces';
import { User } from '../../entities';

describe('Entity User Test', () => {
  it('should return user object', () => {
    const newUser: InputCreateUser = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12**',
      profile: 'engineer',
      use_terms: true,
      use_privacy: true,
    };

    const user = User.create(newUser);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(typeof user.value.user.id).toBe('string');
  });

  it('should return InvalidFieldError - error name', () => {
    const newUser: InputCreateUser = {
      name: 'Fernando Pessoa',
      email: 'fernando.pessoam@email.com',
      username: 'enganderson',
      password: 'anCD12**',
      profile: 'engineer',
      use_terms: true,
      use_privacy: false,
    };

    const user = User.create(newUser);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(user.value.name).toBe('InvalidFieldError');
  });
});
