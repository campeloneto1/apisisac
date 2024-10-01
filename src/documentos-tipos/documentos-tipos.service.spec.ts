import { Test, TestingModule } from '@nestjs/testing';
import { DocumentosTiposService } from './documentos-tipos.service';

describe('DocumentosTiposService', () => {
  let service: DocumentosTiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentosTiposService],
    }).compile();

    service = module.get<DocumentosTiposService>(DocumentosTiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
