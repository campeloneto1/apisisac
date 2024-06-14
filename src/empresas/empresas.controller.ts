import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { Empresa, Empresas } from './empresa.interface';

@Controller('empresas')
export class EmpresasController {
    constructor(private empresasService: EmpresasService){}

    @Get()
    async index(@Request() req):Promise<Empresas>{
        return this.empresasService.index(req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Empresa>  {
        return await this.empresasService.find(id);
    }
    
    @Post()
    async create(@Body() object: Empresa, @Request() req) {
        return await this.empresasService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Empresa, @Request() req) {
        return await this.empresasService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.empresasService.remove(id, req.user);
    }
}
