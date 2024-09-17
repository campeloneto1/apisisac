import { Test, TestingModule } from '@nestjs/testing';
import { BancosService } from './bancos.service';

describe('BancosService', () => {
  let service: BancosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BancosService],
    }).compile();

    service = module.get<BancosService>(BancosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
