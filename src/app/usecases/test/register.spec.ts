import { RegisterUser } from '../register-user.usecases';
import { InMemoryUsersRepository } from '../../../../test/in-memory-repository';
import { BcryptService } from '../../../infra/services';

describe('Register validation', () => {
  it('should return user object', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const bcryptService = new BcryptService();
    const data = {
      name: 'Anderson Oliveira',
      job: 'Engenheiro Civil',
      email: 'and.orisistem@gmail.com',
      phone: '88 99999 9999',
      whatsapp: '+5588999999999',
      state: 'CE',
      city: 'Crato',
      password: '123456',
    };
    const newUser = new RegisterUser(usersRepository, bcryptService);

    const { email } = await newUser.execute(data);

    expect(usersRepository.database).toHaveLength(1);

    expect(usersRepository.database[0].email).toEqual(email);
  });
});
