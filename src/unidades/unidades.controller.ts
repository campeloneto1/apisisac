import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { Unidade, Unidades } from './unidade.interface';

@Controller('unidades')
export class UnidadesController {
    constructor(private unidadesService: UnidadesService){}

    @Get()
    async index():Promise<Unidades>{
        return this.unidadesService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Unidade>  {
        return await this.unidadesService.find(id);
    }
    
    @Post()
    async create(@Body() object: Unidade, @Request() req) {
        return await this.unidadesService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Unidade, @Request() req) {
        return await this.unidadesService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.unidadesService.remove(id, req.user);
    }
}
