import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisConsumoService } from './materiais-consumo.service';

describe('MateriaisConsumoService', () => {
  let service: MateriaisConsumoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisConsumoService],
    }).compile();

    service = module.get<MateriaisConsumoService>(MateriaisConsumoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
