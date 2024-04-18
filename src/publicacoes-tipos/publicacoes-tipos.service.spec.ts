import { Test, TestingModule } from '@nestjs/testing';
import { PublicacoesTiposService } from './publicacoes-tipos.service';

describe('PublicacoesTiposService', () => {
  let service: PublicacoesTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicacoesTiposService],
    }).compile();

    service = module.get<PublicacoesTiposService>(PublicacoesTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
