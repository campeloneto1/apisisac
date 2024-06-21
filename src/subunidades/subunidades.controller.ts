import { Controller, Post, Body, Get, Param, Put, Delete, Request, Query } from '@nestjs/common';
import { SubunidadesService } from './subunidades.service';
import { Subunidade, Subunidades } from './subunidade.interface';

@Controller('subunidades')
export class SubunidadesController {
    constructor(private subunidadesService: SubunidadesService){}

    @Get()
    async index(@Request() req, @Query() params: any):Promise<Subunidades>{
        return await this.subunidadesService.index(params, req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Subunidade>  {
        return await this.subunidadesService.find(id);
    }
    
    @Post()
    async create(@Body() object: Subunidade, @Request() req) {
        return await this.subunidadesService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Subunidade, @Request() req) {
        return await this.subunidadesService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.subunidadesService.remove(id, req.user);
    }

    @Get(':id/whereUnidade')
    async wherePais(@Param('id') id: number):Promise<Subunidades>  {
        return await this.subunidadesService.whereUnidade(id);
    }
}
