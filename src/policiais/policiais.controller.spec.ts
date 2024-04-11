import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisController } from './policiais.controller';

describe('PoliciaisController', () => {
  let controller: PoliciaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciaisController],
    }).compile();

    controller = module.get<PoliciaisController>(PoliciaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
