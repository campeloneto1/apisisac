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
  ArmamentoCalibre,
  ArmamentosCalibres,
} from './armamento-calibre.interface';
import { ArmamentosCalibresService } from './armamentos-calibres.service';

@Controller('armamentos-calibres')
export class ArmamentosCalibresController {
  constructor(private armamentosCalibresService: ArmamentosCalibresService) {}

  @Get()
  async index(): Promise<ArmamentosCalibres> {
    return this.armamentosCalibresService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<ArmamentoCalibre> {
    return await this.armamentosCalibresService.find(id);
  }

  @Post()
  async create(@Body() object: ArmamentoCalibre, @Request() req) {
    return await this.armamentosCalibresService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: ArmamentoCalibre,
    @Request() req,
  ) {
    return await this.armamentosCalibresService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.armamentosCalibresService.remove(id, req.user);
  }
}
