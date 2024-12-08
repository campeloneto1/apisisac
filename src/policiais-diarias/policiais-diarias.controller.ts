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
import { PoliciaisDiariasService } from './policiais-diarias.service';
import { PolicialDiaria, PoliciaisDiarias } from './policial-diaria.interface';

@Controller('policiais-diarias')
export class PoliciaisDiariasController {
  constructor(private policiaisDiariasService: PoliciaisDiariasService) {}

  @Get()
  async index(): Promise<PoliciaisDiarias> {
    return this.policiaisDiariasService.index();
  }

  @Get(':id/wherepol')
  async wherePol(
    @Param('id') id: number,
    @Request() req,
  ): Promise<PoliciaisDiarias> {
    return await this.policiaisDiariasService.wherePolicial(id, req.user);
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<PolicialDiaria> {
    return await this.policiaisDiariasService.find(id);
  }

  @Post()
  async create(@Body() object: PolicialDiaria, @Request() req) {
    return await this.policiaisDiariasService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: PolicialDiaria,
    @Request() req,
  ) {
    return await this.policiaisDiariasService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.policiaisDiariasService.remove(id, req.user);
  }

  @Post('relatorio')
  async relatorio(@Body() object: any, @Request() req) {
    return await this.policiaisDiariasService.relatorio(object, req.user);
  }
}
