import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisService } from './policiais.service';

describe('PoliciaisService', () => {
  let service: PoliciaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciaisService],
    }).compile();

    service = module.get<PoliciaisService>(PoliciaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
