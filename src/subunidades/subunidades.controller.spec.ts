import { Test, TestingModule } from '@nestjs/testing';
import { SubunidadesController } from './subunidades.controller';

describe('SubunidadesController', () => {
  let controller: SubunidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubunidadesController],
    }).compile();

    controller = module.get<SubunidadesController>(SubunidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
