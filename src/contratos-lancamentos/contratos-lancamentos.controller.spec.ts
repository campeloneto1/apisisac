import { Test, TestingModule } from '@nestjs/testing';
import { ContratosLancamentosController } from './contratos-lancamentos.controller';

describe('ContratosLancamentosController', () => {
  let controller: ContratosLancamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosLancamentosController],
    }).compile();

    controller = module.get<ContratosLancamentosController>(ContratosLancamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
