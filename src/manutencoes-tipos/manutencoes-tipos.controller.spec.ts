import { Test, TestingModule } from '@nestjs/testing';
import { ManutencoesTiposController } from './manutencoes-tipos.controller';

describe('ManutencoesTiposController', () => {
  let controller: ManutencoesTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManutencoesTiposController],
    }).compile();

    controller = module.get<ManutencoesTiposController>(ManutencoesTiposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
