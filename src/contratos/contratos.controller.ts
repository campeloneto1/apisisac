import { Controller, Post, Body, Get, Param, Put, Delete, Request, Query } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { Contrato, Contratos } from './contrato.interface';

@Controller('contratos')
export class ContratosController {
    constructor(private contratosService: ContratosService){}

    @Get()
    async index(@Request() req, @Query() params: any):Promise<Contratos>{
        return this.contratosService.index(params, req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<Contrato>  {
        return await this.contratosService.find(id, req.user);
    }
    
    @Post()
    async create(@Body() object: Contrato, @Request() req) {
        return await this.contratosService.create(object, req.user);
    }

    @Put(':id/aditivar')
    async aditivar(@Param('id') id: number, @Body() object: any, @Request() req) {
        return await this.contratosService.aditivar(id, object, req.user);
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
