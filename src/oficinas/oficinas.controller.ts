import { Controller,  Post, Body, Get, Param, Put, Delete, Request, Query } from '@nestjs/common';
import { Oficina, Oficinas } from './oficina.interface';
import { OficinasService } from './oficinas.service';

@Controller('oficinas')
export class OficinasController {
    constructor(private oficinasService: OficinasService){}

    @Get()
    async index(@Request() req, @Query() params: any):Promise<Oficinas>{
        return this.oficinasService.index(params, req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<Oficina>  {
        return await this.oficinasService.find(id, req.user);
    }
    
    @Post()
    async create(@Body() object: Oficina, @Request() req) {
        return await this.oficinasService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Oficina, @Request() req) {
        return await this.oficinasService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.oficinasService.remove(id, req.user);
    }
}
