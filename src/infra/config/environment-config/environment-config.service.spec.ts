import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseConfigService } from './environment-config.service';
import { ConfigService } from '@nestjs/config';

describe('EnvironmentConfigService', () => {
  let service: DatabaseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, DatabaseConfigService],
    }).compile();

    service = module.get<DatabaseConfigService>(DatabaseConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
