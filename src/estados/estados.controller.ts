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
import { EstadosService } from './estados.service';
import { Estado, Estados } from './estado.interface';

@Controller('estados')
export class EstadosController {
  constructor(private estadosService: EstadosService) {}

  @Get()
  async index(): Promise<Estados> {
    return this.estadosService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Estado> {
    return await this.estadosService.find(id);
  }

  @Post()
  async create(@Body() object: Estado, @Request() req) {
    return await this.estadosService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: Estado,
    @Request() req,
  ) {
    return await this.estadosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.estadosService.remove(id, req.user);
  }

  @Get(':id/wherePais')
  async wherePais(@Param('id') id: number): Promise<Estados> {
    return await this.estadosService.wherePais(id);
  }
}
