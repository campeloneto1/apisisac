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
import { PoliciaisHistoricoService } from './policiais-historico.service';
import {
  PoliciaisHistoricos,
  PolicialHistorico,
} from './policial-historico.interface';

@Controller('policiais-historico')
export class PoliciaisHistoricoController {
  constructor(private policiaisHistoricoService: PoliciaisHistoricoService) {}

  @Get()
  async index(
    @Request() req,
    @Query() params: any,
  ): Promise<PoliciaisHistoricos> {
    return this.policiaisHistoricoService.index(params, req.user);
  }

  @Get(':id/policial')
  async wherePol(
    @Param('id') id: number,
    @Request() req,
  ): Promise<PoliciaisHistoricos> {
    return await this.policiaisHistoricoService.wherePol(id, req.user);
  }

  @Get(':id')
  async find(
    @Param('id') id: number,
    @Request() req,
  ): Promise<PolicialHistorico> {
    return await this.policiaisHistoricoService.find(id, req.user);
  }

  @Post()
  async create(@Body() object: PolicialHistorico, @Request() req) {
    return await this.policiaisHistoricoService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: PolicialHistorico,
    @Request() req,
  ) {
    return await this.policiaisHistoricoService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.policiaisHistoricoService.remove(id, req.user);
  }
}
