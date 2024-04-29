import { Test, TestingModule } from '@nestjs/testing';
import { PatrimoniosService } from './patrimonios.service';

describe('PatrimoniosService', () => {
  let service: PatrimoniosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatrimoniosService],
    }).compile();

    service = module.get<PatrimoniosService>(PatrimoniosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
