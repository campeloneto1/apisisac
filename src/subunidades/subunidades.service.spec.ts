import { Test, TestingModule } from '@nestjs/testing';
import { SubunidadesService } from './subunidades.service';

describe('SubunidadesService', () => {
  let service: SubunidadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubunidadesService],
    }).compile();

    service = module.get<SubunidadesService>(SubunidadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
