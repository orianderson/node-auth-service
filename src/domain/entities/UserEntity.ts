import { BadRequestInterface } from '../exceptions';

export abstract class Entity<T> {
  private fields: string[];
  constructor(user: T, fields: string[]) {
    this.fields = fields;

    this.validade(user);
  }
  private validade(user: T): T {
    this.verifyIfFieldsIsEmpty(user);

    return user;
  }

  private verifyIfFieldsIsEmpty(user: T) {
    this.fields.forEach((item) => {
      if (!user[item]) {
        throw new BadRequestInterface({
          message: `O campo ${item} deve ser preenchido`,
          code_error: null,
        });
      }
    });
  }
}
