import { Test, TestingModule } from '@nestjs/testing';
import { DiariasStatusService } from './diarias-status.service';

describe('DiariasStatusService', () => {
  let service: DiariasStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiariasStatusService],
    }).compile();

    service = module.get<DiariasStatusService>(DiariasStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
