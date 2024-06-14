import { Test, TestingModule } from '@nestjs/testing';
import { ContratosTiposService } from './contratos-tipos.service';

describe('ContratosTiposService', () => {
  let service: ContratosTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContratosTiposService],
    }).compile();

    service = module.get<ContratosTiposService>(ContratosTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
