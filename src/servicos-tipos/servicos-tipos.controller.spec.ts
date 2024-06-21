import { Test, TestingModule } from '@nestjs/testing';
import { ServicosTiposController } from './servicos-tipos.controller';

describe('ServicosTiposController', () => {
  let controller: ServicosTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicosTiposController],
    }).compile();

    controller = module.get<ServicosTiposController>(ServicosTiposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
