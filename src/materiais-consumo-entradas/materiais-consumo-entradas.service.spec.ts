import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoEntradasService } from './materiais-consumo-entradas.service';

describe('MateriaisConsumoEntradasService', () => {
  let service: MateriaisConsumoEntradasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisConsumoEntradasService],
    }).compile();

    service = module.get<MateriaisConsumoEntradasService>(MateriaisConsumoEntradasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
