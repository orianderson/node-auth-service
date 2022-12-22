import { UserInterface } from '@domain/types';
import { User } from '../entities';
import { Email } from '../valueObjects';

describe('Test User Entity', () => {
  const email = new Email('and.orisistem@gmail.com');
  it('should return a user', () => {
    const newUser: UserInterface = {
      id: '123456',
      name: 'Anderson Oliveira',
      email: email,
    };

    const { user } = new User(newUser);

    expect(user.email).toEqual(email);
  });
});
