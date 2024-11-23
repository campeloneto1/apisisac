import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisFeriasController } from './policiais-ferias.controller';

describe('PoliciaisFeriasController', () => {
  let controller: PoliciaisFeriasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciaisFeriasController],
    }).compile();

    controller = module.get<PoliciaisFeriasController>(
      PoliciaisFeriasController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
