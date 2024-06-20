import { Controller,  Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { VeiculoPolicial, VeiculosPoliciais } from './veiculo-policial.interface';
import { VeiculosPoliciaisService } from './veiculos-policiais.service';

@Controller('veiculos-policiais')
export class VeiculosPoliciaisController {
    constructor(private veiculosPoliciaisService: VeiculosPoliciaisService){}

    @Get()
    async index(@Request() req):Promise<VeiculosPoliciais>{
        return this.veiculosPoliciaisService.index(req.user);
    }

    @Get('emprestados')
    async emprestados(@Request() req):Promise<VeiculosPoliciais>{
        return this.veiculosPoliciaisService.emprestados(req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<VeiculoPolicial>  {
        return await this.veiculosPoliciaisService.find(id, req.user);
    }
    
    @Post()
    async create(@Body() object: VeiculoPolicial, @Request() req) {
        return await this.veiculosPoliciaisService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: VeiculoPolicial, @Request() req) {
        return await this.veiculosPoliciaisService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.veiculosPoliciaisService.remove(id, req.user);
    }

    @Post('receber')
    async receber(@Body() object: any, @Request() req) {
        return await this.veiculosPoliciaisService.receber(object, req.user);
    }

    @Post('relatorio')
    async relatorio(@Body() object: any, @Request() req) {
        return await this.veiculosPoliciaisService.relatorio(object, req.user);
    }

    @Get('emprestadopolicial')
    async emprestadoPolicial(@Request() req):Promise<VeiculoPolicial>{
        return await this.veiculosPoliciaisService.emprestadoPolicial(req.user);
    }
}
