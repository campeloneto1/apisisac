import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisCursosController } from './policiais-cursos.controller';

describe('PoliciaisCursosController', () => {
  let controller: PoliciaisCursosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciaisCursosController],
    }).compile();

    controller = module.get<PoliciaisCursosController>(
      PoliciaisCursosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
