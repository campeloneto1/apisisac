import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoTiposController } from './materiais-consumo-tipos.controller';

describe('MateriaisConsumoTiposController', () => {
  let controller: MateriaisConsumoTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisConsumoTiposController],
    }).compile();

    controller = module.get<MateriaisConsumoTiposController>(
      MateriaisConsumoTiposController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
