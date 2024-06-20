import { Test, TestingModule } from '@nestjs/testing';
import { UsersSubunidadesController } from './users-subunidades.controller';

describe('UsersSubunidadesController', () => {
  let controller: UsersSubunidadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersSubunidadesController],
    }).compile();

    controller = module.get<UsersSubunidadesController>(UsersSubunidadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
