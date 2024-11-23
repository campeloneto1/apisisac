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
import { DocumentosService } from './documentos.service';
import { Documento, Documentos } from './documento.interface';

@Controller('documentos')
export class DocumentosController {
  constructor(private documentosService: DocumentosService) {}

  @Get()
  async index(): Promise<Documentos> {
    return this.documentosService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Documento> {
    return await this.documentosService.find(id);
  }

  @Post()
  async create(@Body() object: Documento, @Request() req) {
    return await this.documentosService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: Documento,
    @Request() req,
  ) {
    return await this.documentosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.documentosService.remove(id, req.user);
  }
}
