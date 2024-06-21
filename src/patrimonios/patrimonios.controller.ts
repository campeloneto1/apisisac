import { Controller,  Post, Body, Get, Param, Put, Delete, Request, Query } from '@nestjs/common';
import { Patrimonio, Patrimonios } from './patrimonio.interface';
import { PatrimoniosService } from './patrimonios.service';

@Controller('patrimonios')
export class PatrimoniosController {
    constructor(private patrimoniosService: PatrimoniosService){}

    @Get()
    async index(@Request() req, @Query() params: any):Promise<Patrimonios>{
        return this.patrimoniosService.index(params, req.user);
    }

    @Get('disponiveis')
    async disponiveis(@Request() req, @Query() params: any):Promise<Patrimonios>{
        return this.patrimoniosService.disponiveis(params, req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<Patrimonio>  {
        return await this.patrimoniosService.find(id, req.user);
    }
    
    @Post()
    async create(@Body() object: Patrimonio, @Request() req) {
        return await this.patrimoniosService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Patrimonio, @Request() req) {
        return await this.patrimoniosService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.patrimoniosService.remove(id, req.user);
    }

    @Post('relatorio')
    async relatorio(@Body() object: any, @Request() req) {
        return await this.patrimoniosService.relatorio(object, req.user);
    }
}
