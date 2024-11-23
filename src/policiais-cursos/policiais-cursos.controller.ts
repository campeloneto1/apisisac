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
import { PoliciaisCursosService } from './policiais-cursos.service';
import { PoliciaisCursos, PolicialCurso } from './policial-curso.interface';

@Controller('policiais-cursos')
export class PoliciaisCursosController {
  constructor(private policiaisCursosService: PoliciaisCursosService) {}

  @Get()
  async index(@Request() req, @Query() params: any): Promise<PoliciaisCursos> {
    return this.policiaisCursosService.index(params, req.user);
  }

  @Get(':id/wherepol')
  async wherePol(
    @Param('id') id: number,
    @Request() req,
  ): Promise<PoliciaisCursos> {
    return await this.policiaisCursosService.wherePolicial(id, req.user);
  }

  @Get(':id')
  async find(@Param('id') id: number, @Request() req): Promise<PolicialCurso> {
    return await this.policiaisCursosService.find(id, req.user);
  }

  @Post()
  async create(@Body() object: PolicialCurso, @Request() req) {
    return await this.policiaisCursosService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: PolicialCurso,
    @Request() req,
  ) {
    return await this.policiaisCursosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.policiaisCursosService.remove(id, req.user);
  }

  @Post('relatorio')
  async relatorio(@Body() object: any, @Request() req) {
    return await this.policiaisCursosService.relatorio(object, req.user);
  }
}
