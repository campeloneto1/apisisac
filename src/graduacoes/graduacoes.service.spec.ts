import { Test, TestingModule } from '@nestjs/testing';
import { GraduacoesService } from './graduacoes.service';

describe('GraduacoesService', () => {
  let service: GraduacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraduacoesService],
    }).compile();

    service = module.get<GraduacoesService>(GraduacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
