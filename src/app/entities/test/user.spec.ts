import { randomUUID } from 'crypto';

import { User } from '../';

const id = randomUUID();
const date = new Date();

describe('User Validation', () => {
  it('should be able to create user', () => {
    const user = {
      id: id,
      name: 'Anderson Oliveira',
      job: 'Engenheiro Civil',
      email: 'and.orisistem@gmail.com',
      phone: '88 99999 9999',
      whatsapp: '+5588999999999',
      state: 'CE',
      city: 'Crato',
      created_at: date,
    };

    const newUser = new User(user);

    expect(newUser.user).toEqual({
      id: id,
      name: 'Anderson Oliveira',
      job: 'Engenheiro Civil',
      email: 'and.orisistem@gmail.com',
      phone: '88 99999-9999',
      whatsapp: '+5588999999999',
      state: 'CE',
      city: 'Crato',
      created_at: date,
    });
  });

  it('should be able to throw new Error', () => {
    const user = {
      name: 'Anderson Oliveira',
      job: 'Engenheiro Civil',
      email: 'and.orisistem@gmail.com',
      phone: '88 99999 9999',
      whatsapp: '+5588999999999',
      state: 'CE',
      // city: 'Crato',
    };

    expect(() => new User(user)).toThrowError();
  });
});
