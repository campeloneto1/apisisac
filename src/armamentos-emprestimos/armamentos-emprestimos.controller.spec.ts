import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosEmprestimosController } from './armamentos-emprestimos.controller';

describe('ArmamentosEmprestimosController', () => {
  let controller: ArmamentosEmprestimosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmamentosEmprestimosController],
    }).compile();

    controller = module.get<ArmamentosEmprestimosController>(ArmamentosEmprestimosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
