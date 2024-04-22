import { Test, TestingModule } from '@nestjs/testing';
import { ArmamentosCalibresService } from './armamentos-calibres.service';

describe('ArmamentosCalibresService', () => {
  let service: ArmamentosCalibresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmamentosCalibresService],
    }).compile();

    service = module.get<ArmamentosCalibresService>(ArmamentosCalibresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
