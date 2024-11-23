import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoSaidasItensController } from './materiais-consumo-saidas-itens.controller';

describe('MateriaisConsumoSaidasItensController', () => {
  let controller: MateriaisConsumoSaidasItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisConsumoSaidasItensController],
    }).compile();

    controller = module.get<MateriaisConsumoSaidasItensController>(
      MateriaisConsumoSaidasItensController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
