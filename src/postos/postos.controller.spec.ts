import { Test, TestingModule } from '@nestjs/testing';
import { PostosController } from './postos.controller';

describe('PostosController', () => {
  let controller: PostosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostosController],
    }).compile();

    controller = module.get<PostosController>(PostosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
