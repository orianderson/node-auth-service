import { Email } from '../Email';

describe('Email unit test', () => {
  it('should return valid email', () => {
    const email = 'and.orisistem@gmail.com';

    const obj = Email.create(email);

    if (obj.isRight()) {
      expect(obj.value.email).toEqual(email);
    }
  });

  it('should be false - invalid email', () => {
    const email = 'and.orisistem@';

    const obj = Email.create(email);

    if (!obj.isRight()) {
      expect(obj.value.name).toEqual('InvalidEmailError');
    }
  });
});
