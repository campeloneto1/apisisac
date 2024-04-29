import { Test, TestingModule } from '@nestjs/testing';
import { PatrimoniosController } from './patrimonios.controller';

describe('PatrimoniosController', () => {
  let controller: PatrimoniosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatrimoniosController],
    }).compile();

    controller = module.get<PatrimoniosController>(PatrimoniosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
