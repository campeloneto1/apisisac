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
import { DiariasStatusService } from './diarias-status.service';
import { DiariaStatus, DiariasStatus } from './diaria-status.interface';

@Controller('diarias-status')
export class DiariasStatusController {
  constructor(private diariasStatusService: DiariasStatusService) {}

  @Get()
  async index(): Promise<DiariasStatus> {
    return this.diariasStatusService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<DiariaStatus> {
    return await this.diariasStatusService.find(id);
  }

  @Post()
  async create(@Body() object: DiariaStatus, @Request() req) {
    return await this.diariasStatusService.create(object, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() object: DiariaStatus,
    @Request() req,
  ) {
    return await this.diariasStatusService.update(id, object, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.diariasStatusService.remove(id, req.user);
  }
}
