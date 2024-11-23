import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosPoliciaisAlteracoesController } from './veiculos-policiais-alteracoes.controller';

describe('VeiculosPoliciaisAlteracoesController', () => {
  let controller: VeiculosPoliciaisAlteracoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculosPoliciaisAlteracoesController],
    }).compile();

    controller = module.get<VeiculosPoliciaisAlteracoesController>(
      VeiculosPoliciaisAlteracoesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
