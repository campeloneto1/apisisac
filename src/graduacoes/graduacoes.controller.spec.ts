import { Test, TestingModule } from '@nestjs/testing';
import { GraduacoesController } from './graduacoes.controller';

describe('GraduacoesController', () => {
  let controller: GraduacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraduacoesController],
    }).compile();

    controller = module.get<GraduacoesController>(GraduacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
