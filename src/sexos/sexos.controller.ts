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
import { SexosService } from './sexos.service';
import { Sexo, Sexos } from './sexo.interface';

@Controller('sexos')
export class SexosController {
  constructor(private sexosService: SexosService) {}

  @Get()
  async index(): Promise<Sexos> {
    return this.sexosService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Sexo> {
    return await this.sexosService.find(id);
  }

  @Post()
  async create(@Body() object: Sexo, @Request() req) {
    return await this.sexosService.create(object, req.user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() object: Sexo, @Request() req) {
    return await this.sexosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.sexosService.remove(id, req.user);
  }
}
