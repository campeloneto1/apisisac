import { Test, TestingModule } from '@nestjs/testing';
import { PostosService } from './postos.service';

describe('PostosService', () => {
  let service: PostosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostosService],
    }).compile();

    service = module.get<PostosService>(PostosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
