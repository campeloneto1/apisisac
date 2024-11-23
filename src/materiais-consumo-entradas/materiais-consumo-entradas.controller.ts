import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Request,
  Query,
} from '@nestjs/common';
import {
  MateriaisConsumoEntradas,
  MaterialConsumoEntrada,
} from './material-consumo-entrada.interface';
import { MateriaisConsumoEntradasService } from './materiais-consumo-entradas.service';

@Controller('materiais-consumo-entradas')
export class MateriaisConsumoEntradasController {
  constructor(
    private materialConsumoEntradasService: MateriaisConsumoEntradasService,
  ) {}

  @Get()
  async index(
    @Request() req,
    @Query() params: any,
  ): Promise<MateriaisConsumoEntradas> {
    return this.materialConsumoEntradasService.index(params, req.user);
  }

  @Get(':id')
  async find(
    @Param('id') id: number,
    @Request() req,
  ): Promise<MaterialConsumoEntrada> {
    return await this.materialConsumoEntradasService.find(id, req.user);
  }

  @Post()
  async create(@Body() object: MaterialConsumoEntrada, @Request() req) {
    return await this.materialConsumoEntradasService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: MaterialConsumoEntrada,
    @Request() req,
  ) {
    return await this.materialConsumoEntradasService.update(
      id,
      object,
      req.user,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.materialConsumoEntradasService.remove(id, req.user);
  }

  @Post('relatorio')
  async relatorio(@Body() object: any, @Request() req) {
    return await this.materialConsumoEntradasService.relatorio(
      object,
      req.user,
    );
  }
}
