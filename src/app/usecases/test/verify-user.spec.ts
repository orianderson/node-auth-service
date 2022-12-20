import {
  UsersRepository,
  UserDatabaseService,
  DatabaseClient,
} from '@infra/database';
import { VerifyUser } from '@app/usecases';
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
  const verifyUserUsecases = new VerifyUser(
    userRepository,
    mailService,
    environmentService,
  );

  const email = 'and.orisistem@gmail.com';

  it('Verify user by email should return userId', async () => {
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

  it('should send email', async () => {
    const userId = await verifyUserUsecases.verifyUserByEmail(email);
    expect.assertions(1);

    return expect(userId).toEqual({
      id: '12345',
    });
  });
});
