import { Test, TestingModule } from '@nestjs/testing';
import { EscalasController } from './escalas.controller';

describe('EscalasController', () => {
  let controller: EscalasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EscalasController],
    }).compile();

    controller = module.get<EscalasController>(EscalasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
