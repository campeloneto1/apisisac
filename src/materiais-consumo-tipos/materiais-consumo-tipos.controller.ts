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
import { MateriaisConsumoTiposService } from './materiais-consumo-tipos.service';
import {
  MateriaisConsumoTipos,
  MaterialConsumoTipo,
} from './material-consumo-tipo.interface';

@Controller('materiais-consumo-tipos')
export class MateriaisConsumoTiposController {
  constructor(
    private materialConsumoTiposService: MateriaisConsumoTiposService,
  ) {}

  @Get()
  async index(): Promise<MateriaisConsumoTipos> {
    return this.materialConsumoTiposService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<MaterialConsumoTipo> {
    return await this.materialConsumoTiposService.find(id);
  }

  @Post()
  async create(@Body() object: MaterialConsumoTipo, @Request() req) {
    return await this.materialConsumoTiposService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: MaterialConsumoTipo,
    @Request() req,
  ) {
    return await this.materialConsumoTiposService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.materialConsumoTiposService.remove(id, req.user);
  }
}
