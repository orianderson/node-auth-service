export const authGuard = () => {
  return (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    return descriptor;
  };
};
