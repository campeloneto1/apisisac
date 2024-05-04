import { Controller,  Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { VeiculoOficina, VeiculosOficinas } from './veiculo-oficina.interface';
import { VeiculosOficinasService } from './veiculos-oficinas.service';

@Controller('veiculos-oficinas')
export class VeiculosOficinasController {
    constructor(private veiculosOficinasService: VeiculosOficinasService){}

    @Get()
    async index(@Request() req):Promise<VeiculosOficinas>{
        return this.veiculosOficinasService.index(req.user);
    }

    @Get('emmanutencao')
    async emmanutencao(@Request() req):Promise<VeiculosOficinas>{
        return this.veiculosOficinasService.emmanutencao(req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<VeiculoOficina>  {
        return await this.veiculosOficinasService.find(id, req.user);
    }
    
    @Post()
    async create(@Body() object: VeiculoOficina, @Request() req) {
        return await this.veiculosOficinasService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: VeiculoOficina, @Request() req) {
        return await this.veiculosOficinasService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.veiculosOficinasService.remove(id, req.user);
    }

    @Post('receber')
    async receber(@Body() object: any, @Request() req) {
        return await this.veiculosOficinasService.receber(object, req.user);
    }

    @Post('relatorio')
    async relatorio(@Body() object: any, @Request() req) {
        return await this.veiculosOficinasService.relatorio(object, req.user);
    }
}
