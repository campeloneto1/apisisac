import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisPoliciaisController } from './materiais-policiais.controller';

describe('MateriaisPoliciaisController', () => {
  let controller: MateriaisPoliciaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaisPoliciaisController],
    }).compile();

    controller = module.get<MateriaisPoliciaisController>(
      MateriaisPoliciaisController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
