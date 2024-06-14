import { Test, TestingModule } from '@nestjs/testing';
import { EscolaridadesController } from './escolaridades.controller';

describe('EscolaridadesController', () => {
  let controller: EscolaridadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EscolaridadesController],
    }).compile();

    controller = module.get<EscolaridadesController>(EscolaridadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
