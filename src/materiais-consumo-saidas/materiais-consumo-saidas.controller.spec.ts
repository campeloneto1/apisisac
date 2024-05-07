import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoSaidasController } from './materiais-consumo-saidas.controller';

describe('MateriaisConsumoSaidasController', () => {
  let controller: MateriaisConsumoSaidasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisConsumoSaidasController],
    }).compile();

    controller = module.get<MateriaisConsumoSaidasController>(MateriaisConsumoSaidasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
