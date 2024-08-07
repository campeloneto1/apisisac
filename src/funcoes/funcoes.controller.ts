import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { FuncoesService } from './funcoes.service';
import { Cor, Cores } from 'src/cores/cor.interface';

@Controller('funcoes')
export class FuncoesController {
    constructor(private funcoesService: FuncoesService){}

    @Get()
    async index():Promise<Cores>{
        return this.funcoesService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Cor>  {
        return await this.funcoesService.find(id);
    }
    
    @Post()
    async create(@Body() object: Cor, @Request() req) {
        return await this.funcoesService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Cor, @Request() req) {
        return await this.funcoesService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.funcoesService.remove(id, req.user);
    }
}
