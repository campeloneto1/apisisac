import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { ServicosTiposService } from './servicos-tipos.service';
import { ServicoTipo, ServicosTipos } from './servico-tipo.interface';

@Controller('servicos-tipos')
export class ServicosTiposController {
    constructor(private servicosTiposService: ServicosTiposService){}

    @Get()
    async index():Promise<ServicosTipos>{
        return this.servicosTiposService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<ServicoTipo>  {
        return await this.servicosTiposService.find(id);
    }
    
    @Post()
    async create(@Body() object: ServicoTipo, @Request() req) {
        return await this.servicosTiposService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: ServicoTipo, @Request() req) {
        return await this.servicosTiposService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.servicosTiposService.remove(id, req.user);
    }
}
