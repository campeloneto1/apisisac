import { Test, TestingModule } from '@nestjs/testing';
import { PoliciaisCursosService } from './policiais-cursos.service';

describe('PoliciaisCursosService', () => {
  let service: PoliciaisCursosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciaisCursosService],
    }).compile();

    service = module.get<PoliciaisCursosService>(PoliciaisCursosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
