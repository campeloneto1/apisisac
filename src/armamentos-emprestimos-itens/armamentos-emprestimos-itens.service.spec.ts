import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosEmprestimosItensService } from './armamentos-emprestimos-itens.service';

describe('ArmamentosEmprestimosItensService', () => {
  let service: ArmamentosEmprestimosItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmamentosEmprestimosItensService],
    }).compile();

    service = module.get<ArmamentosEmprestimosItensService>(
      ArmamentosEmprestimosItensService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
