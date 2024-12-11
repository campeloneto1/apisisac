import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisPromocoesService } from './policiais-promocoes.service';

describe('PoliciaisPromocoesService', () => {
  let service: PoliciaisPromocoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciaisPromocoesService],
    }).compile();

    service = module.get<PoliciaisPromocoesService>(PoliciaisPromocoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
