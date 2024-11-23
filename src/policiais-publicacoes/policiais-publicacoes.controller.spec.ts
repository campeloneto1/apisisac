import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisPublicacoesController } from './policiais-publicacoes.controller';

describe('PoliciaisPublicacoesController', () => {
  let controller: PoliciaisPublicacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciaisPublicacoesController],
    }).compile();

    controller = module.get<PoliciaisPublicacoesController>(
      PoliciaisPublicacoesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
