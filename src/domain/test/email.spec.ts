import { Email } from '@domain/valueObjects';

describe('Email validation', () => {
  it('should be able to create a user email', () => {
    const email = 'and.orisistem@gmail.com';
    const { value } = new Email(email);

    expect(value).toEqual(email);
  });

  it('should not be able to throw Error', () => {
    expect(() => new Email('and.com')).toThrowError();
  });
});
