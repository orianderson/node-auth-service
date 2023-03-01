/**
 * It takes a promise and returns an array with the first element being the error and the second
 * element being the result
 * @param {any} promise - The promise that you want to handle.
 *
 * const [error, result] = await () => {}
 */
export const handleAction = (promise: any) =>
  promise.then((result: any) => [null, result]).catch((error: any) => [error]);
