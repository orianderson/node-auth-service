import { UserUsecasesFactory } from '../user-usecases/UserUsecasesFactory';

describe('Reset Password Usecases Test', () => {
  const usecases = new UserUsecasesFactory();
  const id = '28be0dc5-0082-4a44-8f9e-a63dd21ac21a';

  it('should return void', async () => {
    // const response = await usecases.resetPassword().execute({
    //   id: id,
    //   password: 'anAN0201**',
    //   email: '',
    //   username: '',
    // });
    // if (response.isRight()) {
    //   expect(response.value).toBeTruthy();
    // }
  });

  // it('should return error - user do not exist', async () => {
  //   const response = usecases.resetPassword();

  //   expect(async () =>
  //     response.execute({
  //       id: 'abcdefgh',
  //       password: 'anAN0201**',
  //       email: '',
  //       username: '',
  //     }),
  //   ).rejects.toThrowError();
  // });
});
