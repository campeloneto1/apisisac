import { Test, TestingModule } from '@nestjs/testing';
import { EscalasTiposController } from './escalas-tipos.controller';

describe('EscalasTiposController', () => {
  let controller: EscalasTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EscalasTiposController],
    }).compile();

    controller = module.get<EscalasTiposController>(EscalasTiposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
