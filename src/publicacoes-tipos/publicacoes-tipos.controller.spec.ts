import { Test, TestingModule } from '@nestjs/testing';
import { PublicacoesTiposController } from './publicacoes-tipos.controller';

describe('PublicacoesTiposController', () => {
  let controller: PublicacoesTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicacoesTiposController],
    }).compile();

    controller = module.get<PublicacoesTiposController>(
      PublicacoesTiposController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
