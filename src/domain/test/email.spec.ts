import { Email } from '@domain/entities';

describe('Email validation', () => {
  it('should be able to create a user email', () => {
    const email = new Email('and.orisistem@gmail.com');

    expect(email).toBeTruthy();
  });

  it('should not be able to throw Error', () => {
    expect(() => new Email('and.com')).toThrowError();
  });

  it('should to be able to crate a user email', () => {
    const { email } = new Email('and.orisistem@gmail.com');

    expect(email).toEqual('and.orisistem@gmail.com');
  });
});
