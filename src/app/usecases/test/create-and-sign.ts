// // import { RegisterUser } from '../register-user.usecases';
// import { InMemoryUsersRepository } from '../../../../test/in-memory-repository';
// import { BcryptService } from '../../../infra/common/security';

// import { LoginUseCases } from '../authentication.usecases';

// const initDatabase = async (usersRepository: InMemoryUsersRepository) => {
//   const bcryptService = new BcryptService();
//   const data = {
//     name: 'Anderson Oliveira',
//     job: 'Engenheiro Civil',
//     email: 'and.orisistem@gmail.com',
//     phone: '88 99999 9999',
//     whatsapp: '+5588999999999',
//     state: 'CE',
//     city: 'Crato',
//     password: '123456',
//   };

//   const newUser = new RegisterUser(usersRepository, bcryptService);

//   await newUser.execute(data);
// };

// describe('User Authentication', () => {
//   const usersRepository = new InMemoryUsersRepository();

//   // const loginUseCases = new LoginUseCases(usersRepository);

//   beforeEach(() => {
//     return initDatabase(usersRepository);
//   });

//   // it('should return user', async () => {
//   //   const user = await loginUseCases.signUser({
//   //     email: 'and.orisistem@gmail.com',
//   //     password: '123456',
//   //   });

//   //   expect(usersRepository.database).toHaveLength(1);

//   //   expect(user.email).toEqual('and.orisistem@gmail.com');
//   // });
// });
