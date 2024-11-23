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
import { MateriaisTiposService } from './materiais-tipos.service';
import { MateriaisTipos, MaterialTipo } from './material-tipo.interface';

@Controller('materiais-tipos')
export class MateriaisTiposController {
  constructor(private materialTiposService: MateriaisTiposService) {}

  @Get()
  async index(): Promise<MateriaisTipos> {
    return this.materialTiposService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<MaterialTipo> {
    return await this.materialTiposService.find(id);
  }

  @Post()
  async create(@Body() object: MaterialTipo, @Request() req) {
    return await this.materialTiposService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: MaterialTipo,
    @Request() req,
  ) {
    return await this.materialTiposService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.materialTiposService.remove(id, req.user);
  }
}
