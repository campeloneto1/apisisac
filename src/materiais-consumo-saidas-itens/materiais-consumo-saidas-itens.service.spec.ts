import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoSaidasItensService } from './materiais-consumo-saidas-itens.service';

describe('MateriaisConsumoSaidasItensService', () => {
  let service: MateriaisConsumoSaidasItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisConsumoSaidasItensService],
    }).compile();

    service = module.get<MateriaisConsumoSaidasItensService>(
      MateriaisConsumoSaidasItensService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
