import { Test, TestingModule } from '@nestjs/testing';
import { EscolaridadesService } from './escolaridades.service';

describe('EscolaridadesService', () => {
  let service: EscolaridadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EscolaridadesService],
    }).compile();

    service = module.get<EscolaridadesService>(EscolaridadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
