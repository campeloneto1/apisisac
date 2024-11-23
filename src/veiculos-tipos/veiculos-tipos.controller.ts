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
import { VeiculosTiposService } from './veiculos-tipos.service';
import { VeiculoTipo, VeiculosTipos } from './veiculo-tipo.interface';

@Controller('veiculos-tipos')
export class VeiculosTiposController {
  constructor(private veiculosTiposService: VeiculosTiposService) {}

  @Get()
  async index(): Promise<VeiculosTipos> {
    return this.veiculosTiposService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<VeiculoTipo> {
    return await this.veiculosTiposService.find(id);
  }

  @Post()
  async create(@Body() object: VeiculoTipo, @Request() req) {
    return await this.veiculosTiposService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: VeiculoTipo,
    @Request() req,
  ) {
    return await this.veiculosTiposService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.veiculosTiposService.remove(id, req.user);
  }
}
