import { Test, TestingModule } from '@nestjs/testing';
import { ContratosObjetosController } from './contratos-objetos.controller';

describe('ContratosObjetosController', () => {
  let controller: ContratosObjetosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosObjetosController],
    }).compile();

    controller = module.get<ContratosObjetosController>(ContratosObjetosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
