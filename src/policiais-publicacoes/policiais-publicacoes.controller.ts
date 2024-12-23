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
import { PoliciaisPublicacoesService } from './policiais-publicacoes.service';
import {
  PoliciaisPublicacoes,
  PolicialPublicacao,
} from './policial-publicacao.interface';

@Controller('policiais-publicacoes')
export class PoliciaisPublicacoesController {
  constructor(
    private policiaisPublicacoesService: PoliciaisPublicacoesService,
  ) {}

  @Get()
  async index(
    @Request() req,
    @Query() params: any,
  ): Promise<PoliciaisPublicacoes> {
    return this.policiaisPublicacoesService.index(params, req.user);
  }

  @Get(':id/wherepol')
  async wherePol(
    @Param('id') id: number,
    @Request() req,
  ): Promise<PoliciaisPublicacoes> {
    return await this.policiaisPublicacoesService.wherePolicial(id, req.user);
  }

  @Get(':id')
  async find(
    @Param('id') id: number,
    @Request() req,
  ): Promise<PolicialPublicacao> {
    return await this.policiaisPublicacoesService.find(id, req.user);
  }

  @Post()
  async create(@Body() object: PolicialPublicacao, @Request() req) {
    return await this.policiaisPublicacoesService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: PolicialPublicacao,
    @Request() req,
  ) {
    return await this.policiaisPublicacoesService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.policiaisPublicacoesService.remove(id, req.user);
  }
}
