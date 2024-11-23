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
import { ArmamentoTipo, ArmamentosTipos } from './armamento-tipo.interface';
import { ArmamentosTiposService } from './armamentos-tipos.service';

@Controller('armamentos-tipos')
export class ArmamentosTiposController {
  constructor(private armamentosTiposService: ArmamentosTiposService) {}

  @Get()
  async index(): Promise<ArmamentosTipos> {
    return this.armamentosTiposService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<ArmamentoTipo> {
    return await this.armamentosTiposService.find(id);
  }

  @Post()
  async create(@Body() object: ArmamentoTipo, @Request() req) {
    return await this.armamentosTiposService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: ArmamentoTipo,
    @Request() req,
  ) {
    return await this.armamentosTiposService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.armamentosTiposService.remove(id, req.user);
  }
}
