import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosTamanhosController } from './armamentos-tamanhos.controller';

describe('ArmamentosTamanhosController', () => {
  let controller: ArmamentosTamanhosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmamentosTamanhosController],
    }).compile();

    controller = module.get<ArmamentosTamanhosController>(
      ArmamentosTamanhosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
