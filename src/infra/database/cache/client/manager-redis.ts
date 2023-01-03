import { promisify } from 'util';
import * as redis from 'redis';

export const redisClient = (client: redis): any => {
  const setAsync = promisify(client.set).bind(client);
  const existsAsync = promisify(client.exists).bind(client);
  const getAsync = promisify(client.get).bind(client);
  const delAsync = promisify(client.del).bind(client);

  return {
    async setKey(key: string, value: string, expiration: number) {
      await setAsync(key, value);
    },

    async getKey(key: string) {
      return getAsync(key);
    },

    async isKey(key: string) {
      const result = await existsAsync(key);
      return result === 1;
    },

    async delete(key: string) {
      await delAsync(key);
    },
  };
};
