import { Test, TestingModule } from '@nestjs/testing';
import { EscalasTiposService } from './escalas-tipos.service';

describe('EscalasTiposService', () => {
  let service: EscalasTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EscalasTiposService],
    }).compile();

    service = module.get<EscalasTiposService>(EscalasTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
