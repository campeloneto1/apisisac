import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisDiariasController } from './policiais-diarias.controller';

describe('PoliciaisDiariasController', () => {
  let controller: PoliciaisDiariasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciaisDiariasController],
    }).compile();

    controller = module.get<PoliciaisDiariasController>(
      PoliciaisDiariasController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
