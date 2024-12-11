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
import { PoliciaisPromocoesService } from './policiais-promocoes.service';
import {
  PoliciaisPromocoes,
  PolicialPromocao,
} from './policial-promocao.interface';

@Controller('policiais-promocoes')
export class PoliciaisPromocoesController {
  constructor(private policiaisPromocoesService: PoliciaisPromocoesService) {}

  @Get()
  async index(): Promise<PoliciaisPromocoes> {
    return this.policiaisPromocoesService.index();
  }

  @Get(':id/wherepol')
  async wherePol(
    @Param('id') id: number,
    @Request() req,
  ): Promise<PoliciaisPromocoes> {
    return await this.policiaisPromocoesService.wherePolicial(id, req.user);
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<PolicialPromocao> {
    return await this.policiaisPromocoesService.find(id);
  }

  @Post()
  async create(@Body() object: PolicialPromocao, @Request() req) {
    return await this.policiaisPromocoesService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: PolicialPromocao,
    @Request() req,
  ) {
    return await this.policiaisPromocoesService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.policiaisPromocoesService.remove(id, req.user);
  }

  @Post('relatorio')
  async relatorio(@Body() object: any, @Request() req) {
    return await this.policiaisPromocoesService.relatorio(object, req.user);
  }
}
