import { Test, TestingModule } from '@nestjs/testing';
import { BancosController } from './bancos.controller';

describe('BancosController', () => {
  let controller: BancosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BancosController],
    }).compile();

    controller = module.get<BancosController>(BancosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
