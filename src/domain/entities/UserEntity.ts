import { BadRequestException } from '@helpers/exceptions';

export abstract class UserEntity<T> {
  private fields: string[];
  constructor(user: T, fields: string[]) {
    this.fields = fields;

    this.verifyIfFieldsIsEmpty(user);
  }

  private verifyIfFieldsIsEmpty(user: T) {
    this.fields.forEach((item) => {
      if (!user[item]) {
        throw new BadRequestException({
          message: `O campo ${item} deve ser preenchido`,
          code_error: null,
        });
      }
    });
  }
}
