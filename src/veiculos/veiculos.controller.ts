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
import { Veiculo, Veiculos } from './veiculo.interface';
import { VeiculosService } from './veiculos.service';

@Controller('veiculos')
export class VeiculosController {
  constructor(private veiculosService: VeiculosService) {}

  @Get()
  async index(@Request() req, @Query() params: any): Promise<Veiculos> {
    return this.veiculosService.index(params, req.user);
  }

  @Get('disponiveis')
  async disponiveis(@Request() req, @Query() params: any): Promise<Veiculos> {
    return await this.veiculosService.disponiveis(params, req.user);
  }

  @Get('quantidade')
  async quantidade(@Request() req, @Query() params: any): Promise<number> {
    return await this.veiculosService.quantidade(params, req.user);
  }

  @Get('all')
  async getAll(@Request() req, @Query() params: any): Promise<Veiculos> {
    return await this.veiculosService.getAll(params, req.user);
  }

  @Get(':id')
  async find(@Param('id') id: number, @Request() req): Promise<Veiculo> {
    return await this.veiculosService.find(id, req.user);
  }

  @Post()
  async create(@Body() object: Veiculo, @Request() req) {
    return await this.veiculosService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: Veiculo,
    @Request() req,
  ) {
    return await this.veiculosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.veiculosService.remove(id, req.user);
  }

  @Post('relatorio')
  async relatorio(@Body() object: any, @Request() req) {
    return await this.veiculosService.relatorio(object, req.user);
  }
}
