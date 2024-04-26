import { Test, TestingModule } from '@nestjs/testing';
import { ManutencoesTiposService } from './manutencoes-tipos.service';

describe('ManutencoesTiposService', () => {
  let service: ManutencoesTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManutencoesTiposService],
    }).compile();

    service = module.get<ManutencoesTiposService>(ManutencoesTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
