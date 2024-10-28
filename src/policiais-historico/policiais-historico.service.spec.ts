import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisHistoricoService } from './policiais-historico.service';

describe('PoliciaisHistoricoService', () => {
  let service: PoliciaisHistoricoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciaisHistoricoService],
    }).compile();

    service = module.get<PoliciaisHistoricoService>(PoliciaisHistoricoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
