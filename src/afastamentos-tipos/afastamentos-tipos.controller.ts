import { Controller,  Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { AfastamentoTipo, AfastamentosTipos } from './afastamento-tipo.interface';
import { AfastamentosTiposService } from './afastamentos-tipos.service';


@Controller('afastamentos-tipos')
export class AfastamentosTiposController {
    constructor(private afastamentosTiposService: AfastamentosTiposService){}

    @Get()
    async index():Promise<AfastamentosTipos>{
        return this.afastamentosTiposService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<AfastamentoTipo>  {
        return await this.afastamentosTiposService.find(id);
    }
    
    @Post()
    async create(@Body() object: AfastamentoTipo, @Request() req) {
        return await this.afastamentosTiposService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: AfastamentoTipo, @Request() req) {
        return await this.afastamentosTiposService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.afastamentosTiposService.remove(id, req.user);
    }
}
