import { IAuthorizationManager } from '@app/cache';
import { promisify } from 'util';
import * as redis from 'redis';

export class ManagerCache implements IAuthorizationManager {
  private list: redis;

  constructor(list: redis) {
    this.list = list;
  }

  private managerList() {
    return redis.createClient(this.list);
  }

  async setKey(key: string, value: any, expiration: number) {
    const setAsync = promisify(this.managerList().set).bind(this.list);
    await setAsync(key, value);
    this.list.expireat(key, expiration);
  }

  async getKey(key: string) {
    const getAsync = promisify(this.managerList().get).bind(this.managerList());

    return getAsync(key);
  }

  async isKey(key: string) {
    const existKey = promisify(this.managerList().exists).bind(this.list);

    const result = await existKey(key);

    return result === 1;
  }

  async delete(key: string) {
    const delAsync = promisify(this.managerList().del).bind(this.list);

    await delAsync(key);
  }
}
