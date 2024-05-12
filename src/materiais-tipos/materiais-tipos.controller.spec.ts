import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisTiposController } from './materiais-tipos.controller';

describe('MateriaisTiposController', () => {
  let controller: MateriaisTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisTiposController],
    }).compile();

    controller = module.get<MateriaisTiposController>(MateriaisTiposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
