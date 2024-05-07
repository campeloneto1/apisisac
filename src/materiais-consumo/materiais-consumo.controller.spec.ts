import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoController } from './materiais-consumo.controller';

describe('MateriaisConsumoController', () => {
  let controller: MateriaisConsumoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisConsumoController],
    }).compile();

    controller = module.get<MateriaisConsumoController>(MateriaisConsumoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
