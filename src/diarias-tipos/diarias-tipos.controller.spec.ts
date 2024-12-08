import { Test, TestingModule } from '@nestjs/testing';
import { DiariasTiposController } from './diarias-tipos.controller';

describe('DiariasTiposController', () => {
  let controller: DiariasTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiariasTiposController],
    }).compile();

    controller = module.get<DiariasTiposController>(DiariasTiposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
