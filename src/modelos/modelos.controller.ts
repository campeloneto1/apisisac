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
import { ModelosService } from './modelos.service';
import { Modelo, Modelos } from './modelo.interface';

@Controller('modelos')
export class ModelosController {
  constructor(private modelosService: ModelosService) {}

  @Get()
  async index(): Promise<Modelos> {
    return this.modelosService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Modelo> {
    return await this.modelosService.find(id);
  }

  @Post()
  async create(@Body() object: Modelo, @Request() req) {
    return await this.modelosService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: Modelo,
    @Request() req,
  ) {
    return await this.modelosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.modelosService.remove(id, req.user);
  }

  @Get(':id/whereMarca')
  async whereMarca(@Param('id') id: number): Promise<Modelos> {
    return await this.modelosService.whereMarca(id);
  }
}
