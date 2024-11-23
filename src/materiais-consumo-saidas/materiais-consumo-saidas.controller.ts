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
  MateriaisConsumoSaidas,
  MaterialConsumoSaida,
} from './material-consumo-saida.interface';
import { MateriaisConsumoSaidasService } from './materiais-consumo-saidas.service';

@Controller('materiais-consumo-saidas')
export class MateriaisConsumoSaidasController {
  constructor(
    private materialConsumoSaidaService: MateriaisConsumoSaidasService,
  ) {}

  @Get()
  async index(
    @Request() req,
    @Query() params: any,
  ): Promise<MateriaisConsumoSaidas> {
    return this.materialConsumoSaidaService.index(params, req.user);
  }

  @Get(':id')
  async find(
    @Param('id') id: number,
    @Request() req,
  ): Promise<MaterialConsumoSaida> {
    return await this.materialConsumoSaidaService.find(id, req.user);
  }

  @Post()
  async create(@Body() object: MaterialConsumoSaida, @Request() req) {
    return await this.materialConsumoSaidaService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: MaterialConsumoSaida,
    @Request() req,
  ) {
    return await this.materialConsumoSaidaService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.materialConsumoSaidaService.remove(id, req.user);
  }

  @Post('relatorio')
  async relatorio(@Body() object: any, @Request() req) {
    return await this.materialConsumoSaidaService.relatorio(object, req.user);
  }
}
