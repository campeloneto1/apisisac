import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosPoliciaisService } from './veiculos-policiais.service';

describe('VeiculosPoliciaisService', () => {
  let service: VeiculosPoliciaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeiculosPoliciaisService],
    }).compile();

    service = module.get<VeiculosPoliciaisService>(VeiculosPoliciaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
