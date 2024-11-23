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
  MateriaisConsumoSaidasItens,
  MaterialConsumoSaidaItem,
} from './material-consumo-saida-item.interface';
import { MateriaisConsumoSaidasItensService } from './materiais-consumo-saidas-itens.service';

@Controller('materiais-consumo-saidas-itens')
export class MateriaisConsumoSaidasItensController {
  constructor(
    private materiasConsumoSaidasItensService: MateriaisConsumoSaidasItensService,
  ) {}

  @Get()
  async index(): Promise<MateriaisConsumoSaidasItens> {
    return this.materiasConsumoSaidasItensService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<MaterialConsumoSaidaItem> {
    return await this.materiasConsumoSaidasItensService.find(id);
  }

  @Post()
  async create(@Body() object: MaterialConsumoSaidaItem, @Request() req) {
    return await this.materiasConsumoSaidasItensService.create(
      object,
      req.user,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: MaterialConsumoSaidaItem,
    @Request() req,
  ) {
    return await this.materiasConsumoSaidasItensService.update(
      id,
      object,
      req.user,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.materiasConsumoSaidasItensService.remove(id, req.user);
  }
}
