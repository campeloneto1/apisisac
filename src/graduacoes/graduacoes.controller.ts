import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { GraduacoesService } from './graduacoes.service';
import { Graduacao, Graduacoes } from './graduacao.interface';

@Controller('graduacoes')
export class GraduacoesController {
    constructor(private graduacoesService: GraduacoesService){}

    @Get()
    async index():Promise<Graduacoes>{
        return this.graduacoesService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Graduacao>  {
        return await this.graduacoesService.find(id);
    }
    
    @Post()
    async create(@Body() object: Graduacao, @Request() req) {
        return await this.graduacoesService.create(object, req);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Graduacao, @Request() req) {
        return await this.graduacoesService.update(id, object, req);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.graduacoesService.remove(id, req);
    }
}
