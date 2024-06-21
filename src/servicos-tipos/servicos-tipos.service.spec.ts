import { Test, TestingModule } from '@nestjs/testing';
import { ServicosTiposService } from './servicos-tipos.service';

describe('ServicosTiposService', () => {
  let service: ServicosTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicosTiposService],
    }).compile();

    service = module.get<ServicosTiposService>(ServicosTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
