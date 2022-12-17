import { User } from '../entities/User';
import { UserInterface } from '../types';

describe('User Entity', () => {
  const body: UserInterface = {
    id: '12345',
    name: 'Anderson Oliveira',
    email: 'and.orisistem@gmail.com',
  };

  it('should be able to be truthy', () => {
    const { user } = new User(body);

    expect(user).toBeTruthy();
  });

  it('should be able to throw Error', () => {
    const user = {
      id: '12345',
      name: 'Anderson Oliveira',
      email: '',
    };

    expect(() => new User(user)).toThrowError();
  });
});
