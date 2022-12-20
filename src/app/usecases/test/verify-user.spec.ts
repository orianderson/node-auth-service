import {
  UsersRepository,
  UserDatabaseService,
  DatabaseClient,
} from '@infra/database';
import { VerifyUser } from '@app/usecases';

describe('User Verification', () => {
  const databaseClient = new DatabaseClient();
  const userDatabaseService = new UserDatabaseService(databaseClient);
  const userRepository = new UsersRepository(userDatabaseService);
  const verifyUserUsecases = new VerifyUser(userRepository);
  it('Verify user by email should return userId', async () => {
    const email = 'and.orisistem@gmail.com';
    const userId = await verifyUserUsecases.verifyUserByEmail(email);

    expect(userId).toEqual({
      id: '12345',
    });
  });

  it('should throw error', async () => {
    expect.assertions(1);

    return expect(() =>
      verifyUserUsecases.verifyUserByEmail('email'),
    ).rejects.toThrowError();
  });
});
