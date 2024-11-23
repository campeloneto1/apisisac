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
import { ContratosLancamentosService } from './contratos-lancamentos.service';
import {
  ContratoLancamento,
  ContratosLancamentos,
} from './contrato-lancamento.interface';

@Controller('contratos-lancamentos')
export class ContratosLancamentosController {
  constructor(
    private contratosLancamentosService: ContratosLancamentosService,
  ) {}

  @Get()
  async index(@Request() req): Promise<ContratosLancamentos> {
    return this.contratosLancamentosService.index(req.user);
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<ContratoLancamento> {
    return await this.contratosLancamentosService.find(id);
  }

  @Post()
  async create(@Body() object: ContratoLancamento, @Request() req) {
    return await this.contratosLancamentosService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: ContratoLancamento,
    @Request() req,
  ) {
    return await this.contratosLancamentosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.contratosLancamentosService.remove(id, req.user);
  }
}
