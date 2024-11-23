import { Test, TestingModule } from '@nestjs/testing';
import { DocumentosTiposController } from './documentos-tipos.controller';

describe('DocumentosTiposController', () => {
  let controller: DocumentosTiposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentosTiposController],
    }).compile();

    controller = module.get<DocumentosTiposController>(
      DocumentosTiposController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
