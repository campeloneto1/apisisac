import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { PerfisService } from './perfis.service';
import { Perfil, Perfis } from './perfil.interface';
@Controller('perfis')
export class PerfisController {
    constructor(private perfisService: PerfisService){}

    @Get()
    async index():Promise<Perfis>{
        return this.perfisService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Perfil>  {
        return await this.perfisService.find(id);
    }
    
    @Post()
    async create(@Body() object: Perfil, @Request() req) {
        return await this.perfisService.create(object, req);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Perfil, @Request() req) {
        return await this.perfisService.update(id, object, req);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.perfisService.remove(id, req);
    }
}
