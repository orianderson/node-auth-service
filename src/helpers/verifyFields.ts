import { BadRequestException } from './exceptions';

export const verifyFields = <T>(data: T, fields: string[]) => {
  fields.forEach((item) => {
    if (!data[item]) {
      throw new BadRequestException({
        message: `The field ${item} must be provider`,
        code_error: null,
      });
    }
  });
};
