import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisAtestadosService } from './policiais-atestados.service';

describe('PoliciaisAtestadosService', () => {
  let service: PoliciaisAtestadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciaisAtestadosService],
    }).compile();

    service = module.get<PoliciaisAtestadosService>(PoliciaisAtestadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
