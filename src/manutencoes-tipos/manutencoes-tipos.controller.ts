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
import { ManutencoesTiposService } from './manutencoes-tipos.service';
import { ManutencaoTipo, ManutencoesTipos } from './manutencao-tipo.interface';

@Controller('manutencoes-tipos')
export class ManutencoesTiposController {
  constructor(private manutencoesTiposService: ManutencoesTiposService) {}

  @Get()
  async index(): Promise<ManutencoesTipos> {
    return this.manutencoesTiposService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<ManutencaoTipo> {
    return await this.manutencoesTiposService.find(id);
  }

  @Post()
  async create(@Body() object: ManutencaoTipo, @Request() req) {
    return await this.manutencoesTiposService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: ManutencaoTipo,
    @Request() req,
  ) {
    return await this.manutencoesTiposService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.manutencoesTiposService.remove(id, req.user);
  }
}
