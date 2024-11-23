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
import {
  ArmamentoTamanho,
  ArmamentosTamanhos,
} from './armamento-tamanho.interface';
import { ArmamentosTamanhosService } from './armamentos-tamanhos.service';

@Controller('armamentos-tamanhos')
export class ArmamentosTamanhosController {
  constructor(private armamentosTamanhosService: ArmamentosTamanhosService) {}

  @Get()
  async index(): Promise<ArmamentosTamanhos> {
    return this.armamentosTamanhosService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<ArmamentoTamanho> {
    return await this.armamentosTamanhosService.find(id);
  }

  @Post()
  async create(@Body() object: ArmamentoTamanho, @Request() req) {
    return await this.armamentosTamanhosService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: ArmamentoTamanho,
    @Request() req,
  ) {
    return await this.armamentosTamanhosService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.armamentosTamanhosService.remove(id, req.user);
  }
}
