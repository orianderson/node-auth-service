import { Name } from '../Name';

describe('Email unit test', () => {
  it('should return valid name', () => {
    const name = 'Anderson Oliveira';

    const obj = Name.create(name);

    if (obj.isRight()) {
      expect(obj.value.userName).toEqual(name);
    }
  });

  it('should be false - invalid name', () => {
    const name = 'A';

    const obj = Name.create(name);

    if (!obj.isRight()) {
      expect(obj.value.name).toEqual('InvalidNameError');
    }
  });
});
