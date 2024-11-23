import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisPublicacoesService } from './policiais-publicacoes.service';

describe('PoliciaisPublicacoesService', () => {
  let service: PoliciaisPublicacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciaisPublicacoesService],
    }).compile();

    service = module.get<PoliciaisPublicacoesService>(
      PoliciaisPublicacoesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
