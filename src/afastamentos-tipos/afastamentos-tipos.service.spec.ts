import { Test, TestingModule } from '@nestjs/testing';
import { AfastamentosTiposService } from './afastamentos-tipos.service';

describe('AfastamentosTiposService', () => {
  let service: AfastamentosTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfastamentosTiposService],
    }).compile();

    service = module.get<AfastamentosTiposService>(AfastamentosTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
