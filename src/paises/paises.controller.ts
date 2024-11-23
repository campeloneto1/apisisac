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
import { PaisesService } from './paises.service';
import { Pais, Paises } from './pais.interface';

@Controller('paises')
export class PaisesController {
  constructor(private paisesService: PaisesService) {}

  @Get()
  async index(): Promise<Paises> {
    return this.paisesService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Pais> {
    return await this.paisesService.find(id);
  }

  @Post()
  async create(@Body() object: Pais, @Request() req) {
    return await this.paisesService.create(object, req.user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() object: Pais, @Request() req) {
    return await this.paisesService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.paisesService.remove(id, req.user);
  }
}
