import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { CoresService } from './cores.service';
import { Cor, Cores } from './cor.interface';

@Controller('cores')
export class CoresController {
    constructor(private coresTiposService: CoresService){}

    @Get()
    async index():Promise<Cores>{
        return this.coresTiposService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Cor>  {
        return await this.coresTiposService.find(id);
    }
    
    @Post()
    async create(@Body() object: Cor, @Request() req) {
        return await this.coresTiposService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Cor, @Request() req) {
        return await this.coresTiposService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.coresTiposService.remove(id, req.user);
    }
}
