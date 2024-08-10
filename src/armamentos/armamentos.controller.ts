import { Controller,  Post, Body, Get, Param, Put, Delete, Request, Query } from '@nestjs/common';
import { Armamento, Armamentos } from './armamento.interface';
import { ArmamentosService } from './armamentos.service';

@Controller('armamentos')
export class ArmamentosController {
    constructor(private armamentosService: ArmamentosService){}

    @Get()
    async index(@Request() req, @Query() params: any):Promise<Armamentos>{
        return this.armamentosService.index(params, req.user);
    }

    @Get('disponiveis')
    async disponiveis(@Request() req, @Query() params: any):Promise<Armamentos>{
        return this.armamentosService.disponiveis(params, req.user);
    }

    @Get('vencendo')
    async vencendo(@Request() req, @Query() params: any):Promise<Armamentos>{
        return this.armamentosService.vencendo(params,req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<Armamento>  {
        return await this.armamentosService.find(id, req.user);
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

    @Post('relatorio')
    async relatorio(@Body() object: any, @Request() req) {
        return await this.armamentosService.relatorio(object, req.user);
    }

    @Put(':id/ajustarquant')
    async ajustarquant(@Param('id') id: number, @Body() object: any, @Request() req) {
        return await this.armamentosService.ajustarquant(id, object, req.user);
    }

    @Put(':id/ajustarquant2')
    async ajustarquant2(@Param('id') id: number, @Body() object: any, @Request() req) {
        return await this.armamentosService.ajustarquant2(id, object, req.user);
    }
}
