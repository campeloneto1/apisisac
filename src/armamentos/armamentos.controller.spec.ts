import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosController } from './armamentos.controller';

describe('ArmamentosController', () => {
  let controller: ArmamentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmamentosController],
    }).compile();

    controller = module.get<ArmamentosController>(ArmamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
