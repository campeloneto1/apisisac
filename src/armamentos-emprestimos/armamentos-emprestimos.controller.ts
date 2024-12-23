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
import {
  ArmamentoEmprestimo,
  ArmamentosEmprestimos,
} from './armamento-emprestimo.interface';
import { ArmamentosEmprestimosService } from './armamentos-emprestimos.service';

@Controller('armamentos-emprestimos')
export class ArmamentosEmprestimosController {
  constructor(
    private armamentosEmprestimosService: ArmamentosEmprestimosService,
  ) {}

  @Get()
  async index(
    @Request() req,
    @Query() params: any,
  ): Promise<ArmamentosEmprestimos> {
    return this.armamentosEmprestimosService.index(params, req.user);
  }

  @Get(':id/wherepol')
  async wherePol(
    @Param('id') id: number,
    @Request() req,
  ): Promise<ArmamentosEmprestimos> {
    return await this.armamentosEmprestimosService.wherePolicial(id, req.user);
  }

  @Get(':id')
  async find(
    @Param('id') id: number,
    @Request() req,
  ): Promise<ArmamentoEmprestimo> {
    return await this.armamentosEmprestimosService.find(id, req.user);
  }

  @Post()
  async create(@Body() object: ArmamentoEmprestimo, @Request() req) {
    return await this.armamentosEmprestimosService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: ArmamentoEmprestimo,
    @Request() req,
  ) {
    return await this.armamentosEmprestimosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.armamentosEmprestimosService.remove(id, req.user);
  }

  @Post('receber')
  async receber(@Body() object: any, @Request() req) {
    return await this.armamentosEmprestimosService.receber(object, req.user);
  }

  @Post('relatorio')
  async relatorio(@Body() object: any, @Request() req) {
    return await this.armamentosEmprestimosService.relatorio(object, req.user);
  }
}
