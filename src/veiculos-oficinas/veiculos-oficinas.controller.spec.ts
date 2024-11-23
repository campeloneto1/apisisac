import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosOficinasController } from './veiculos-oficinas.controller';

describe('VeiculosOficinasController', () => {
  let controller: VeiculosOficinasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculosOficinasController],
    }).compile();

    controller = module.get<VeiculosOficinasController>(
      VeiculosOficinasController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
