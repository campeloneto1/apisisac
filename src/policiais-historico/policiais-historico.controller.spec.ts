import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisHistoricoController } from './policiais-historico.controller';

describe('PoliciaisHistoricoController', () => {
  let controller: PoliciaisHistoricoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciaisHistoricoController],
    }).compile();

    controller = module.get<PoliciaisHistoricoController>(
      PoliciaisHistoricoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
