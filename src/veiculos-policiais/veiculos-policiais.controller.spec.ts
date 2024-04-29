import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosPoliciaisController } from './veiculos-policiais.controller';

describe('VeiculosPoliciaisController', () => {
  let controller: VeiculosPoliciaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculosPoliciaisController],
    }).compile();

    controller = module.get<VeiculosPoliciaisController>(VeiculosPoliciaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
