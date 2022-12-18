import { BadRequest } from '../exceptions';

export abstract class UserEntity<T> {
  private fields: string[];
  constructor(user: T, fields: string[]) {
    this.fields = fields;

    this.verifyIfFieldsIsEmpty(user);
  }

  private verifyIfFieldsIsEmpty(user: T) {
    this.fields.forEach((item) => {
      if (!user[item]) {
        throw new BadRequest({
          message: `O campo ${item} deve ser preenchido`,
          code_error: null,
        });
      }
    });
  }
}
