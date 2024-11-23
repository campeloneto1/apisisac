import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisRequeridasService } from './policiais-requeridas.service';

describe('PoliciaisRequeridasService', () => {
  let service: PoliciaisRequeridasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciaisRequeridasService],
    }).compile();

    service = module.get<PoliciaisRequeridasService>(
      PoliciaisRequeridasService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
