import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosEmprestimosService } from './armamentos-emprestimos.service';

describe('ArmamentosEmprestimosService', () => {
  let service: ArmamentosEmprestimosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmamentosEmprestimosService],
    }).compile();

    service = module.get<ArmamentosEmprestimosService>(
      ArmamentosEmprestimosService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
