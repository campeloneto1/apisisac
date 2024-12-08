import { Test, TestingModule } from '@nestjs/testing';
import { DiariasStatusController } from './diarias-status.controller';

describe('DiariasStatusController', () => {
  let controller: DiariasStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiariasStatusController],
    }).compile();

    controller = module.get<DiariasStatusController>(DiariasStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
