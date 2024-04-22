import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosCalibresController } from './armamentos-calibres.controller';

describe('ArmamentosCalibresController', () => {
  let controller: ArmamentosCalibresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmamentosCalibresController],
    }).compile();

    controller = module.get<ArmamentosCalibresController>(ArmamentosCalibresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
