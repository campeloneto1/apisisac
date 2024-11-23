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
import { PatrimoniosTiposService } from './patrimonios-tipos.service';
import { PatrimonioTipo, PatrimoniosTipos } from './patrimonio-tipo.interface';

@Controller('patrimonios-tipos')
export class PatrimoniosTiposController {
  constructor(private patrimoniosTiposService: PatrimoniosTiposService) {}

  @Get()
  async index(): Promise<PatrimoniosTipos> {
    return this.patrimoniosTiposService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<PatrimonioTipo> {
    return await this.patrimoniosTiposService.find(id);
  }

  @Post()
  async create(@Body() object: PatrimonioTipo, @Request() req) {
    return await this.patrimoniosTiposService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: PatrimonioTipo,
    @Request() req,
  ) {
    return await this.patrimoniosTiposService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.patrimoniosTiposService.remove(id, req.user);
  }
}
