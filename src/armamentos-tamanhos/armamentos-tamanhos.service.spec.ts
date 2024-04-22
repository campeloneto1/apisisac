import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosTamanhosService } from './armamentos-tamanhos.service';

describe('ArmamentosTamanhosService', () => {
  let service: ArmamentosTamanhosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmamentosTamanhosService],
    }).compile();

    service = module.get<ArmamentosTamanhosService>(ArmamentosTamanhosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
