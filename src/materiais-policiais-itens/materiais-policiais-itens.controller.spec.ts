import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisPoliciaisItensController } from './materiais-policiais-itens.controller';

describe('MateriaisPoliciaisItensController', () => {
  let controller: MateriaisPoliciaisItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisPoliciaisItensController],
    }).compile();

    controller = module.get<MateriaisPoliciaisItensController>(MateriaisPoliciaisItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
