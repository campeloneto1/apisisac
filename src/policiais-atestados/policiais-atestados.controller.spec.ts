import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisAtestadosController } from './policiais-atestados.controller';

describe('PoliciaisAtestadosController', () => {
  let controller: PoliciaisAtestadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciaisAtestadosController],
    }).compile();

    controller = module.get<PoliciaisAtestadosController>(PoliciaisAtestadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
