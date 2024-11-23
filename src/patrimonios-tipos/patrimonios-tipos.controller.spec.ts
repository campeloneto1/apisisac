import { Test, TestingModule } from '@nestjs/testing';
import { PatrimoniosTiposController } from './patrimonios-tipos.controller';

describe('PatrimoniosTiposController', () => {
  let controller: PatrimoniosTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatrimoniosTiposController],
    }).compile();

    controller = module.get<PatrimoniosTiposController>(
      PatrimoniosTiposController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
