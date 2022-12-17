import { Engineer } from '../entities';
import { EngineerInterface } from '../types';

describe('Engineer Entity', () => {
  const body: EngineerInterface = {
    id: '12345',
    name: 'Anderson Oliveira',
    email: 'and.orisistem@gmail.com',
    city: 'Crato',
    job: 'Engenheiro Civil',
    phone: '88 99999-9999',
    state: 'CE',
    whatsapp: '+5588999999999',
    password: '123456',
  };

  it('should be able to be truthy', () => {
    const { engineer } = new Engineer(body);

    console.log(engineer);

    expect(engineer).toBeTruthy();
  });
});
