export const verifyFields = <T>(
  data: T,
  fields: string[],
): { field: string; check: boolean } => {
  for (let i = 0; i < fields.length; i++) {
    if (!data[fields[i]]) {
      return {
        field: fields[i],
        check: false,
      };
    }
  }

  return {
    field: '',
    check: true,
  };
};
