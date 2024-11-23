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
import {
  MateriaisConsumoEntradasItens,
  MaterialConsumoEntradaItem,
} from './material-consumo-entrada-item.interface';
import { MateriaisConsumoEntradasItensService } from './materiais-consumo-entradas-itens.service';

@Controller('materiais-consumo-entradas-itens')
export class MateriaisConsumoEntradasItensController {
  constructor(
    private materiasConsumoEntradasItensService: MateriaisConsumoEntradasItensService,
  ) {}

  @Get()
  async index(): Promise<MateriaisConsumoEntradasItens> {
    return this.materiasConsumoEntradasItensService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<MaterialConsumoEntradaItem> {
    return await this.materiasConsumoEntradasItensService.find(id);
  }

  @Post()
  async create(@Body() object: MaterialConsumoEntradaItem, @Request() req) {
    return await this.materiasConsumoEntradasItensService.create(
      object,
      req.user,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: MaterialConsumoEntradaItem,
    @Request() req,
  ) {
    return await this.materiasConsumoEntradasItensService.update(
      id,
      object,
      req.user,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.materiasConsumoEntradasItensService.remove(id, req.user);
  }
}
