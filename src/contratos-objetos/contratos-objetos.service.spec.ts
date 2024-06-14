import { Test, TestingModule } from '@nestjs/testing';
import { ContratosObjetosService } from './contratos-objetos.service';

describe('ContratosObjetosService', () => {
  let service: ContratosObjetosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContratosObjetosService],
    }).compile();

    service = module.get<ContratosObjetosService>(ContratosObjetosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
