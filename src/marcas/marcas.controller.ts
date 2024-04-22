import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { Marca, Marcas } from './marca.interface';

@Controller('marcas')
export class MarcasController {
    constructor(private marcasService: MarcasService){}

    @Get()
    async index():Promise<Marcas>{
        return this.marcasService.index();
    }

    @Get('armamentos')
    async marcasArmamentos():Promise<Marcas>{
        return this.marcasService.marcasArmamentos();
    }

    @Get('logistica')
    async marcasLogisica():Promise<Marcas>{
        return this.marcasService.marcasLogistica();
    }

    @Get('transporte')
    async marcasTransporte():Promise<Marcas>{
        return this.marcasService.marcasTransporte();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Marca>  {
        return await this.marcasService.find(id);
    }
    
    @Post()
    async create(@Body() object: Marca, @Request() req) {
        return await this.marcasService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Marca, @Request() req) {
        return await this.marcasService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.marcasService.remove(id, req.user);
    }

    
}
