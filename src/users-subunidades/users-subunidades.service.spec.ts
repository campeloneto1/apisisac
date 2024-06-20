import { Test, TestingModule } from '@nestjs/testing';
import { UsersSubunidadesService } from './users-subunidades.service';

describe('UsersSubunidadesService', () => {
  let service: UsersSubunidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersSubunidadesService],
    }).compile();

    service = module.get<UsersSubunidadesService>(UsersSubunidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
