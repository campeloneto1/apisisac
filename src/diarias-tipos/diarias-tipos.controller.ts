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
import { DiariasTiposService } from './diarias-tipos.service';
import { DiariaTipo, DiariasTipos } from './diaria-tipo.interface';

@Controller('diarias-tipos')
export class DiariasTiposController {
  constructor(private diariasTiposService: DiariasTiposService) {}

  @Get()
  async index(): Promise<DiariasTipos> {
    return this.diariasTiposService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<DiariaTipo> {
    return await this.diariasTiposService.find(id);
  }

  @Post()
  async create(@Body() object: DiariaTipo, @Request() req) {
    return await this.diariasTiposService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: DiariaTipo,
    @Request() req,
  ) {
    return await this.diariasTiposService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.diariasTiposService.remove(id, req.user);
  }
}
