import { Test, TestingModule } from '@nestjs/testing';
import { ContratosLancamentosService } from './contratos-lancamentos.service';

describe('ContratosLancamentosService', () => {
  let service: ContratosLancamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContratosLancamentosService],
    }).compile();

    service = module.get<ContratosLancamentosService>(ContratosLancamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
