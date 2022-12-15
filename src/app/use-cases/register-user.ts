import { Injectable } from '@nestjs/common';
import { UserProps } from '../interfaces';
import { User } from '../entities';
import { UsersRepository } from '../repositories';

@Injectable()
export class RegisterUser {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(data: UserProps): Promise<UserProps> {
    const newUser = new User(data);

    const { user } = newUser;

    await this.userRepository.create(newUser);

    return user;
  }
}
