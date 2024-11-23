import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoSaidasService } from './materiais-consumo-saidas.service';

describe('MateriaisConsumoSaidasService', () => {
  let service: MateriaisConsumoSaidasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisConsumoSaidasService],
    }).compile();

    service = module.get<MateriaisConsumoSaidasService>(
      MateriaisConsumoSaidasService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
