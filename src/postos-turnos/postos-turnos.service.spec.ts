import { Test, TestingModule } from '@nestjs/testing';
import { PostosTurnosService } from './postos-turnos.service';

describe('PostosTurnosService', () => {
  let service: PostosTurnosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostosTurnosService],
    }).compile();

    service = module.get<PostosTurnosService>(PostosTurnosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
