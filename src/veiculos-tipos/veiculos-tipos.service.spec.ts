import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosTiposService } from './veiculos-tipos.service';

describe('VeiculosTiposService', () => {
  let service: VeiculosTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeiculosTiposService],
    }).compile();

    service = module.get<VeiculosTiposService>(VeiculosTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
