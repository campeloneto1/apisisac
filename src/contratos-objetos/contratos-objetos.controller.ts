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
import { ContratosObjetosService } from './contratos-objetos.service';
import { ContratoObjeto, ContratosObjetos } from './contrato-objeto.interface';

@Controller('contratos-objetos')
export class ContratosObjetosController {
  constructor(private contratosObjetosService: ContratosObjetosService) {}

  @Get()
  async index(): Promise<ContratosObjetos> {
    return this.contratosObjetosService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<ContratoObjeto> {
    return await this.contratosObjetosService.find(id);
  }

  @Post()
  async create(@Body() object: ContratoObjeto, @Request() req) {
    return await this.contratosObjetosService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: ContratoObjeto,
    @Request() req,
  ) {
    return await this.contratosObjetosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.contratosObjetosService.remove(id, req.user);
  }
}
