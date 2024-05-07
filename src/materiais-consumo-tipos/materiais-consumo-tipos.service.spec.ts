import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoTiposService } from './materiais-consumo-tipos.service';

describe('MateriaisConsumoTiposService', () => {
  let service: MateriaisConsumoTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisConsumoTiposService],
    }).compile();

    service = module.get<MateriaisConsumoTiposService>(MateriaisConsumoTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
