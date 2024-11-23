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
import { CursosService } from './cursos.service';
import { Curso, Cursos } from './curso.interface';

@Controller('cursos')
export class CursosController {
  constructor(private cursosService: CursosService) {}

  @Get()
  async index(): Promise<Cursos> {
    return this.cursosService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Curso> {
    return await this.cursosService.find(id);
  }

  @Post()
  async create(@Body() object: Curso, @Request() req) {
    return await this.cursosService.create(object, req.user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() object: Curso, @Request() req) {
    return await this.cursosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.cursosService.remove(id, req.user);
  }
}
