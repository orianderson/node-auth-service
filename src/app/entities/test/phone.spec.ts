import { Phone } from '../phone';

describe('Phone Validation', () => {
  it('should not be able to throw Error', () => {
    expect(() => new Phone('8892888203')).toThrowError();
  });

  it('should be able to validate phone number', () => {
    const phone = new Phone('88 99288-8203');
    expect(phone).toBeTruthy();
  });

  it('should be able to create a user phone', () => {
    const phone = new Phone('(88) 9 9288-8203');

    expect(phone.value).toEqual('88 99288-8203');
  });
});
