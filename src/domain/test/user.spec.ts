import { UserInterface } from '@domain/types';
import { User } from '../entities';

describe('Test User Entity', () => {
  const email = 'and.orisistem@gmail.com';
  it('should return a user', () => {
    const newUser: UserInterface = {
      id: '123456',
      name: 'Anderson Oliveira',
      email: email,
      password: '123456',
    };

    const { user } = new User(newUser);

    expect(user.email.value).toEqual(email);
  });

  it('should return a user', () => {
    const newUser: UserInterface = {
      id: '123456',
      name: 'Anderson Oliveira',
      email: email,
    };

    expect(() => new User(newUser)).toThrowError();
  });
});
