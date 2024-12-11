import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisPromocoesController } from './policiais-promocoes.controller';

describe('PoliciaisPromocoesController', () => {
  let controller: PoliciaisPromocoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciaisPromocoesController],
    }).compile();

    controller = module.get<PoliciaisPromocoesController>(PoliciaisPromocoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
