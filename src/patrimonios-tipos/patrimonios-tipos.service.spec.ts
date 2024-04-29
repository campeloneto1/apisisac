import { Test, TestingModule } from '@nestjs/testing';
import { PatrimoniosTiposService } from './patrimonios-tipos.service';

describe('PatrimoniosTiposService', () => {
  let service: PatrimoniosTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatrimoniosTiposService],
    }).compile();

    service = module.get<PatrimoniosTiposService>(PatrimoniosTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
