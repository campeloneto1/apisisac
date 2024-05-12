import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisPoliciaisService } from './materiais-policiais.service';

describe('MateriaisPoliciaisService', () => {
  let service: MateriaisPoliciaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisPoliciaisService],
    }).compile();

    service = module.get<MateriaisPoliciaisService>(MateriaisPoliciaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
