import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { EnvironmentConfigService } from '@infra/config';
import { RegisterEngineerUsecases } from '@app/usecases';
// import { InMemoryUsersRepository } from '../../../../test/in-memory-repository';
import {
  BcryptService,
  JwtTokenService,
  RefreshTokenService,
} from '@infra/adapters';
import {
  EngineerRepository,
  EngineerDatabaseService,
  DatabaseClient,
  UsersRepository,
  UserDatabaseService,
} from '@infra/database';

import { LoginUseCases } from '../authentication.usecases';

const bcryptService = new BcryptService();
const data = {
  id: '12345',
  name: 'Anderson Oliveira',
  job: 'Engenheiro Civil',
  email: 'and.orisistem@gmail.com',
  phone: '88 99999 9999',
  whatsapp: '+5588999999999',
  state: 'CE',
  city: 'Crato',
  password: '123456',
};

describe('User Authentication', () => {
  const usersRepository = new EngineerRepository(
    new EngineerDatabaseService(new DatabaseClient()),
  );

  it('should return user', async () => {
    const newUser = new RegisterEngineerUsecases(
      usersRepository,
      bcryptService,
    );

    expect.assertions(1);

    // to create user
    // const user = await newUser.execute(data);
    // expect(user.email).toEqual('and.orisistem@gmail.com');

    return expect(() => newUser.execute(data)).rejects.toThrowError();
  });

  it('test to verify login usecases', async () => {
    const userRepository = new UsersRepository(
      new UserDatabaseService(new DatabaseClient()),
    );
    const jwtService = new JwtService();
    const environment = new EnvironmentConfigService(new ConfigService());
    const jwtTokenService = new JwtTokenService(jwtService, environment);
    const loginUseCases = new LoginUseCases(
      userRepository,
      bcryptService,
      jwtTokenService,
      new RefreshTokenService(jwtService, environment),
    );

    const { email } = await loginUseCases.signInUser({
      email: 'and.orisistem@gmail.com',
      password: '123456',
    });

    expect.assertions(1);
    expect(email).toEqual('and.orisistem@gmail.com');
  });
});
