import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoEntradasItensController } from './materiais-consumo-entradas-itens.controller';

describe('MateriaisConsumoEntradasItensController', () => {
  let controller: MateriaisConsumoEntradasItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisConsumoEntradasItensController],
    }).compile();

    controller = module.get<MateriaisConsumoEntradasItensController>(
      MateriaisConsumoEntradasItensController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
