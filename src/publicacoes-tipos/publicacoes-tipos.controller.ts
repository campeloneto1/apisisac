import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { PublicacoesTiposService } from './publicacoes-tipos.service';
import { PublicacaoTipo, PublicacoesTipos } from './publicacao-tipo.interface';

@Controller('publicacoes-tipos')
export class PublicacoesTiposController {
    constructor(private publicacoesTiposService: PublicacoesTiposService){}

    @Get()
    async index():Promise<PublicacoesTipos>{
        return this.publicacoesTiposService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<PublicacaoTipo>  {
        return await this.publicacoesTiposService.find(id);
    }
    
    @Post()
    async create(@Body() object: PublicacaoTipo, @Request() req) {
        return await this.publicacoesTiposService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: PublicacaoTipo, @Request() req) {
        return await this.publicacoesTiposService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.publicacoesTiposService.remove(id, req.user);
    }
}
