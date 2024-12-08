import { Test, TestingModule } from '@nestjs/testing';
import { DiariasTiposService } from './diarias-tipos.service';

describe('DiariasTiposService', () => {
  let service: DiariasTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiariasTiposService],
    }).compile();

    service = module.get<DiariasTiposService>(DiariasTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
