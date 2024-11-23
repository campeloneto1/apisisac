import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosTiposController } from './armamentos-tipos.controller';

describe('ArmamentosTiposController', () => {
  let controller: ArmamentosTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmamentosTiposController],
    }).compile();

    controller = module.get<ArmamentosTiposController>(
      ArmamentosTiposController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
