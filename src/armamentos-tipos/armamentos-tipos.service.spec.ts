import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosTiposService } from './armamentos-tipos.service';

describe('ArmamentosTiposService', () => {
  let service: ArmamentosTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmamentosTiposService],
    }).compile();

    service = module.get<ArmamentosTiposService>(ArmamentosTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
