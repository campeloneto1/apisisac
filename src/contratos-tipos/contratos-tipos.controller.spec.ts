import { Test, TestingModule } from '@nestjs/testing';
import { ContratosTiposController } from './contratos-tipos.controller';

describe('ContratosTiposController', () => {
  let controller: ContratosTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosTiposController],
    }).compile();

    controller = module.get<ContratosTiposController>(ContratosTiposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
