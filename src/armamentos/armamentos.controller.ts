import { Controller,  Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { Armamento, Armamentos } from './armamento.interface';
import { ArmamentosService } from './armamentos.service';

@Controller('armamentos')
export class ArmamentosController {
    constructor(private armamentosService: ArmamentosService){}

    @Get()
    async index():Promise<Armamentos>{
        return this.armamentosService.index();
    }

    @Get('disponiveis')
    async disponiveis():Promise<Armamentos>{
        return this.armamentosService.disponiveis();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Armamento>  {
        return await this.armamentosService.find(id);
    }
    
    @Post()
    async create(@Body() object: Armamento, @Request() req) {
        return await this.armamentosService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Armamento, @Request() req) {
        return await this.armamentosService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.armamentosService.remove(id, req.user);
    }
}
