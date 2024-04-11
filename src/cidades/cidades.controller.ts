import { Controller,  Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { Cidade, Cidades } from './cidade.interface';

@Controller('cidades')
export class CidadesController {
    constructor(private cidadesService: CidadesService){}

    @Get()
    async index():Promise<Cidades>{
        return this.cidadesService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Cidade>  {
        return await this.cidadesService.find(id);
    }
    
    @Post()
    async create(@Body() object: Cidade, @Request() req) {
        return await this.cidadesService.create(object, req);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Cidade, @Request() req) {
        return await this.cidadesService.update(id, object, req);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.cidadesService.remove(id, req);
    }
}
