import { Controller, Post, Body, Get, Param, Put, Delete, Request  } from '@nestjs/common';
import { PoliciaisAtestadosService } from './policiais-atestados.service';
import { PolicialAtestado, PoliciaisAtestados } from './policial-atestado.interface';

@Controller('policiais-atestados')
export class PoliciaisAtestadosController {
    constructor(private policiaisAtestadosService: PoliciaisAtestadosService){}

    @Get()
    async index():Promise<PoliciaisAtestados>{
        return this.policiaisAtestadosService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<PolicialAtestado>  {
        return await this.policiaisAtestadosService.find(id);
    }
    
    @Post()
    async create(@Body() object: PolicialAtestado, @Request() req) {
        return await this.policiaisAtestadosService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: PolicialAtestado, @Request() req) {
        return await this.policiaisAtestadosService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.policiaisAtestadosService.remove(id, req);
    }
}
