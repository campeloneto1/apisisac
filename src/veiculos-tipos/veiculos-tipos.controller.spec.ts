import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosTiposController } from './veiculos-tipos.controller';

describe('VeiculosTiposController', () => {
  let controller: VeiculosTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculosTiposController],
    }).compile();

    controller = module.get<VeiculosTiposController>(VeiculosTiposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
