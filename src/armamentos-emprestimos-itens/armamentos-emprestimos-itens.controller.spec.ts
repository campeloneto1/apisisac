import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosEmprestimosItensController } from './armamentos-emprestimos-itens.controller';

describe('ArmamentosEmprestimosItensController', () => {
  let controller: ArmamentosEmprestimosItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmamentosEmprestimosItensController],
    }).compile();

    controller = module.get<ArmamentosEmprestimosItensController>(
      ArmamentosEmprestimosItensController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
