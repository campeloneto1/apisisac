import { Test, TestingModule } from '@nestjs/testing';
import { MateriaisTiposService } from './materiais-tipos.service';

describe('MateriaisTiposService', () => {
  let service: MateriaisTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaisTiposService],
    }).compile();

    service = module.get<MateriaisTiposService>(MateriaisTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
