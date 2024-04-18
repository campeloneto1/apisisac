import { Controller, Post, Body, Get, Param, Put, Delete, Request  } from '@nestjs/common';
import { PoliciaisPublicacoesService } from './policiais-publicacoes.service';
import { PoliciaisPublicacoes, PolicialPublicacao } from './policial-publicacao.interface';

@Controller('policiais-publicacoes')
export class PoliciaisPublicacoesController {
    constructor(private policiaisPublicacoesService: PoliciaisPublicacoesService){}

    @Get()
    async index():Promise<PoliciaisPublicacoes>{
        return this.policiaisPublicacoesService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<PolicialPublicacao>  {
        return await this.policiaisPublicacoesService.find(id);
    }
    
    @Post()
    async create(@Body() object: PolicialPublicacao, @Request() req) {
        return await this.policiaisPublicacoesService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: PolicialPublicacao, @Request() req) {
        return await this.policiaisPublicacoesService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.policiaisPublicacoesService.remove(id, req);
    }
}
