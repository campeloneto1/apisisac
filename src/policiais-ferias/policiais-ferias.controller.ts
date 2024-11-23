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
import { PoliciaisFeriasService } from './policiais-ferias.service';
import { PoliciaisFerias, PolicialFerias } from './policial-ferias.interface';

@Controller('policiais-ferias')
export class PoliciaisFeriasController {
  constructor(private policiaisFeriasService: PoliciaisFeriasService) {}

  @Get()
  async index(@Request() req, @Query() params: any): Promise<PoliciaisFerias> {
    return this.policiaisFeriasService.index(params, req.user);
  }

  @Get(':id/wherepol')
  async wherePol(
    @Param('id') id: number,
    @Request() req,
  ): Promise<PoliciaisFerias> {
    return await this.policiaisFeriasService.wherePolicial(id, req.user);
  }

  @Get(':id')
  async find(@Param('id') id: number, @Request() req): Promise<PolicialFerias> {
    return await this.policiaisFeriasService.find(id, req.user);
  }

  @Post()
  async create(@Body() object: PolicialFerias, @Request() req) {
    return await this.policiaisFeriasService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: PolicialFerias,
    @Request() req,
  ) {
    return await this.policiaisFeriasService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.policiaisFeriasService.remove(id, req.user);
  }

  @Post('relatorio')
  async relatorio(@Body() object: any, @Request() req) {
    return await this.policiaisFeriasService.relatorio(object, req.user);
  }
}
