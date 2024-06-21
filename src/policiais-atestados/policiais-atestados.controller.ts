import { Controller, Post, Body, Get, Param, Put, Delete, Request, Query  } from '@nestjs/common';
import { PoliciaisAtestadosService } from './policiais-atestados.service';
import { PolicialAtestado, PoliciaisAtestados } from './policial-atestado.interface';

@Controller('policiais-atestados')
export class PoliciaisAtestadosController {
    constructor(private policiaisAtestadosService: PoliciaisAtestadosService){}

    @Get()
    async index(@Request() req, @Query() params: any):Promise<PoliciaisAtestados>{
        return this.policiaisAtestadosService.index(params, req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<PolicialAtestado>  {
        return await this.policiaisAtestadosService.find(id, req.user);
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
        return await this.policiaisAtestadosService.remove(id, req.user);
    }
}
