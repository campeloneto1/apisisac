import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { Contrato, Contratos } from './contrato.interface';

@Controller('contratos')
export class ContratosController {
    constructor(private contratosService: ContratosService){}

    @Get()
    async index(@Request() req):Promise<Contratos>{
        return this.contratosService.index(req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Contrato>  {
        return await this.contratosService.find(id);
    }
    
    @Post()
    async create(@Body() object: Contrato, @Request() req) {
        return await this.contratosService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Contrato, @Request() req) {
        return await this.contratosService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.contratosService.remove(id, req.user);
    }
}
