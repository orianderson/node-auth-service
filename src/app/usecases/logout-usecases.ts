import { ILogoutPort, ICacheService, allowList, blockList } from '@app/ports';

export class LogoutUsecases implements ILogoutPort<string, void> {
  constructor(private readonly cacheService: ICacheService) {}

  async execute(data: string): Promise<void> {
    await this.cacheService.setKey(blockList(data), {
      value: data,
      expiration: Date.now(),
    });
    await this.cacheService.delete(allowList(data));
  }
}
