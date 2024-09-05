import { Test, TestingModule } from '@nestjs/testing';
import { AfastamentosTiposController } from './afastamentos-tipos.controller';

describe('AfastamentosTiposController', () => {
  let controller: AfastamentosTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfastamentosTiposController],
    }).compile();

    controller = module.get<AfastamentosTiposController>(AfastamentosTiposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
