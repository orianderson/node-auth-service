export const handleAction = (promise: any) =>
  promise.then((result: any) => [null, result]).catch((error: any) => [error]);
