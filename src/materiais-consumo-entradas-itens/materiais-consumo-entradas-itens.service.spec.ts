import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoEntradasItensService } from './materiais-consumo-entradas-itens.service';

describe('MateriaisConsumoEntradasItensService', () => {
  let service: MateriaisConsumoEntradasItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisConsumoEntradasItensService],
    }).compile();

    service = module.get<MateriaisConsumoEntradasItensService>(
      MateriaisConsumoEntradasItensService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
