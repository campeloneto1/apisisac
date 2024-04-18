import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisFeriasService } from './policiais-ferias.service';

describe('PoliciaisFeriasService', () => {
  let service: PoliciaisFeriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciaisFeriasService],
    }).compile();

    service = module.get<PoliciaisFeriasService>(PoliciaisFeriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
