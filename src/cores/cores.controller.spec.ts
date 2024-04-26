import { Test, TestingModule } from '@nestjs/testing';
import { CoresController } from './cores.controller';

describe('CoresController', () => {
  let controller: CoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoresController],
    }).compile();

    controller = module.get<CoresController>(CoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
