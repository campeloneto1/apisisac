import { Controller,  Post, Body, Get, Param, Put, Delete, Request, Query } from '@nestjs/common';
import { VeiculoPolicialAlteracao, VeiculosPoliciaisAlteracoes } from './veiculo-policial-alteracao.interface';
import { VeiculosPoliciaisAlteracoesService } from './veiculos-policiais-alteracoes.service';

@Controller('veiculos-policiais-alteracoes')
export class VeiculosPoliciaisAlteracoesController {
    constructor(private veiculosPoliciaisAlteracoesService: VeiculosPoliciaisAlteracoesService){}

    @Get()
    async index(@Request() req, @Query() params: any){
        
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req)  {
        
    }
    
    @Post()
    async create(@Body() object: VeiculoPolicialAlteracao, @Request() req) {
        return await this.veiculosPoliciaisAlteracoesService.create(object, req.user);  
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: VeiculoPolicialAlteracao, @Request() req) {
        
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.veiculosPoliciaisAlteracoesService.remove(id, req.user);
    }
}
