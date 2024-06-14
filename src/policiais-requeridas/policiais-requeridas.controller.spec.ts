import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisRequeridasController } from './policiais-requeridas.controller';

describe('PoliciaisRequeridasController', () => {
  let controller: PoliciaisRequeridasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciaisRequeridasController],
    }).compile();

    controller = module.get<PoliciaisRequeridasController>(PoliciaisRequeridasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
