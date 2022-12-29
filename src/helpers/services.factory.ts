import {
  DatabaseClient,
  UserDatabaseService,
  UserRepository,
  BcryptService,
} from '@infra/index';

export const servicesFactory = () => {
  const databaseClient = new DatabaseClient();

  const userDatabaseService = new UserDatabaseService(databaseClient);

  const userRepository = new UserRepository(userDatabaseService);

  const bcryptService = new BcryptService();

  return {
    userDatabaseService,
    userRepository,
    bcryptService,
  };
};
