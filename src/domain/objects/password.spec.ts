import { Password } from './Password';

describe('Password test unit', () => {
  it('should return true', () => {
    const password = 'abCD12**';

    const obj = Password.create(password);

    if (obj.isRight()) {
      expect(obj.isRight()).toBeTruthy();
    }
  });

  it('should be false', () => {
    const password = 'abCD12*';

    const obj = Password.create(password);

    if (obj.isLeft()) {
      expect(obj.isRight()).toBeFalsy();
    }
  });

  it('should be false', () => {
    const password = 'ab12*cnn';

    const obj = Password.create(password);

    if (obj.isLeft()) {
      expect(obj.isRight()).toBeFalsy();
    }
  });

  it('should be false', () => {
    const password = 'CDDP12**';

    const obj = Password.create(password);

    if (obj.isLeft()) {
      expect(obj.isRight()).toBeFalsy();
    }
  });

  it('should be false', () => {
    const password = '112451234';

    const obj = Password.create(password);

    if (obj.isLeft()) {
      expect(obj.isRight()).toBeFalsy();
    }
  });
});
