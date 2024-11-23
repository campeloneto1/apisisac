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
import { EscolaridadesService } from './escolaridades.service';
import { Escolaridade, Escolaridades } from './escolaridade.interface';

@Controller('escolaridades')
export class EscolaridadesController {
  constructor(private escolaridadesService: EscolaridadesService) {}

  @Get()
  async index(): Promise<Escolaridades> {
    return this.escolaridadesService.index();
  }

  @Get('policiais-escolaridades')
  async policiaisGraduacoes(@Request() req): Promise<Escolaridade> {
    return await this.escolaridadesService.policiaisEscolaridades(req.user);
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Escolaridade> {
    return await this.escolaridadesService.find(id);
  }

  @Post()
  async create(@Body() object: Escolaridade, @Request() req) {
    return await this.escolaridadesService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: Escolaridade,
    @Request() req,
  ) {
    return await this.escolaridadesService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.escolaridadesService.remove(id, req.user);
  }
}
