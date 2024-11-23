import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosPoliciaisAlteracoesService } from './veiculos-policiais-alteracoes.service';

describe('VeiculosPoliciaisAlteracoesService', () => {
  let service: VeiculosPoliciaisAlteracoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeiculosPoliciaisAlteracoesService],
    }).compile();

    service = module.get<VeiculosPoliciaisAlteracoesService>(
      VeiculosPoliciaisAlteracoesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
