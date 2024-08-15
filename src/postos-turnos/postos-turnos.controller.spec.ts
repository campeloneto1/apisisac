import { Test, TestingModule } from '@nestjs/testing';
import { PostosTurnosController } from './postos-turnos.controller';

describe('PostosTurnosController', () => {
  let controller: PostosTurnosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostosTurnosController],
    }).compile();

    controller = module.get<PostosTurnosController>(PostosTurnosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
