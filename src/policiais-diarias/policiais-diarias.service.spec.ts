import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisDiariasService } from './policiais-diarias.service';

describe('PoliciaisDiariasService', () => {
  let service: PoliciaisDiariasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciaisDiariasService],
    }).compile();

    service = module.get<PoliciaisDiariasService>(PoliciaisDiariasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
