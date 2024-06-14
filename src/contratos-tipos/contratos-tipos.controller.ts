import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { ContratosTiposService } from './contratos-tipos.service';
import { ContratoTipo, ContratosTipos } from './contrato-tipo.interface';

@Controller('contratos-tipos')
export class ContratosTiposController {
    constructor(private contratosTiposService: ContratosTiposService){}

    @Get()
    async index():Promise<ContratosTipos>{
        return this.contratosTiposService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<ContratoTipo>  {
        return await this.contratosTiposService.find(id);
    }
    
    @Post()
    async create(@Body() object: ContratoTipo, @Request() req) {
        return await this.contratosTiposService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: ContratoTipo, @Request() req) {
        return await this.contratosTiposService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.contratosTiposService.remove(id, req.user);
    }
}
