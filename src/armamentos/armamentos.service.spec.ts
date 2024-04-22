import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosService } from './armamentos.service';

describe('ArmamentosService', () => {
  let service: ArmamentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmamentosService],
    }).compile();

    service = module.get<ArmamentosService>(ArmamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
