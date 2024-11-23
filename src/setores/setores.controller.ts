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
import { SetoresService } from './setores.service';
import { Setor, Setores } from './setor.interface';
import { Policiais } from 'src/policiais/policial.interface';

@Controller('setores')
export class SetoresController {
  constructor(private setoresService: SetoresService) {}

  @Get()
  async index(@Request() req, @Query() params: any): Promise<Setores> {
    return this.setoresService.index(params, req.user);
  }

  @Get(':id/whereSubunidade')
  async whereSubunidade(@Param('id') id: number): Promise<Setores> {
    return await this.setoresService.whereSubunidade(id);
  }

  @Get(':id/policiais')
  async gePoliciais(
    @Request() req,
    @Param('id') id: number,
    @Query() params: any,
  ): Promise<Policiais> {
    return await this.setoresService.gePoliciais(id, params, req.user);
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Setor> {
    return await this.setoresService.find(id);
  }

  @Post()
  async create(@Body() object: Setor, @Request() req) {
    return await this.setoresService.create(object, req);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() object: Setor, @Request() req) {
    return await this.setoresService.update(id, object, req);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.setoresService.remove(id, req.user);
  }
}
