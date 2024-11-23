import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Request,
} from '@nestjs/common';
import { DocumentosTiposService } from './documentos-tipos.service';
import { DocumentoTipo, DocumentosTipos } from './documento-tipo.interface';

@Controller('documentos-tipos')
export class DocumentosTiposController {
  constructor(private documentosTiposService: DocumentosTiposService) {}

  @Get()
  async index(): Promise<DocumentosTipos> {
    return this.documentosTiposService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<DocumentoTipo> {
    return await this.documentosTiposService.find(id);
  }

  @Post()
  async create(@Body() object: DocumentoTipo, @Request() req) {
    return await this.documentosTiposService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: DocumentoTipo,
    @Request() req,
  ) {
    return await this.documentosTiposService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.documentosTiposService.remove(id, req.user);
  }
}
