import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosOficinasService } from './veiculos-oficinas.service';

describe('VeiculosOficinasService', () => {
  let service: VeiculosOficinasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeiculosOficinasService],
    }).compile();

    service = module.get<VeiculosOficinasService>(VeiculosOficinasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
