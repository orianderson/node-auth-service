import { VerifyUserControllerAdapter } from './../controllers/auth/verify-user.controller';
import {
  UsersRepository,
  UserDatabaseService,
  DatabaseClient,
} from '@infra/database';
import { MailService } from '@infra/adapters';
import { EnvironmentConfigService } from '@infra/config';
import { ConfigService } from '@nestjs/config';

describe('User Verification', () => {
  const databaseClient = new DatabaseClient();
  const userDatabaseService = new UserDatabaseService(databaseClient);
  const userRepository = new UsersRepository(userDatabaseService);
  const configService = new ConfigService();
  const environmentService = new EnvironmentConfigService(configService);
  const mailService = new MailService(environmentService);

  const email = 'and.orisistem@gmail.com';

  const verifyControllerAdapter = new VerifyUserControllerAdapter(
    userRepository,
    mailService,
    environmentService,
  );

  it('Verify user by email should return userId', async () => {
    const userId = await verifyControllerAdapter.verifyUser(email);

    expect(userId).toEqual({
      id: '12345',
    });
  });

  it('should throw error', async () => {
    expect.assertions(1);

    return expect(() =>
      verifyControllerAdapter.verifyUser('email'),
    ).rejects.toThrowError();
  });
});
