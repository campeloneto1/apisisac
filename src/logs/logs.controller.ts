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
import { LogsService } from './logs.service';
import { Log, Logs } from './log.interface';

@Controller('logs')
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Get()
  async index(): Promise<Logs> {
    return this.logsService.index();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Log> {
    return await this.logsService.find(id);
  }

  @Post()
  async create(@Body() object: Log, @Request() req) {
    return await this.logsService.create(object);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() object: Log, @Request() req) {
    return await this.logsService.update(id, object);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return await this.logsService.remove(id);
  }
}
