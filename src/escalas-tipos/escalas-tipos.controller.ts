import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { EscalasTiposService } from './escalas-tipos.service';
import { EscalaTipo, EscalasTipos } from './escala-tipo.interface';

@Controller('escalas-tipos')
export class EscalasTiposController {
    constructor(private escalasTiposService: EscalasTiposService){}

    @Get()
    async index():Promise<EscalasTipos>{
        return this.escalasTiposService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<EscalaTipo>  {
        return await this.escalasTiposService.find(id);
    }
    
    @Post()
    async create(@Body() object: EscalaTipo, @Request() req) {
        return await this.escalasTiposService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: EscalaTipo, @Request() req) {
        return await this.escalasTiposService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.escalasTiposService.remove(id, req.user);
    }
}
