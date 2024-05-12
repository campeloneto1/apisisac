import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisPoliciaisItensService } from './materiais-policiais-itens.service';

describe('MateriaisPoliciaisItensService', () => {
  let service: MateriaisPoliciaisItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisPoliciaisItensService],
    }).compile();

    service = module.get<MateriaisPoliciaisItensService>(MateriaisPoliciaisItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
