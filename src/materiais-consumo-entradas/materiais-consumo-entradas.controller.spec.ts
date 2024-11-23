import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoEntradasController } from './materiais-consumo-entradas.controller';

describe('MateriaisConsumoEntradasController', () => {
  let controller: MateriaisConsumoEntradasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisConsumoEntradasController],
    }).compile();

    controller = module.get<MateriaisConsumoEntradasController>(
      MateriaisConsumoEntradasController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
