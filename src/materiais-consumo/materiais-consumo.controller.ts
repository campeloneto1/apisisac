import { Controller,  Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { MateriaisConsumo, MaterialConsumo } from './material-consumo.interface';
import { MateriaisConsumoService } from './materiais-consumo.service';

@Controller('materiais-consumo')
export class MateriaisConsumoController {
    constructor(private materiaisConsumoService: MateriaisConsumoService){}

    @Get()
    async index(@Request() req):Promise<MateriaisConsumo>{
        return this.materiaisConsumoService.index(req.user);
    }

    @Get('disponiveis')
    async disponiveis(@Request() req):Promise<MateriaisConsumo>{
        return this.materiaisConsumoService.disponiveis(req.user);
    }

    @Get('vencendo')
    async vencendo(@Request() req):Promise<MateriaisConsumo>{
        return this.materiaisConsumoService.vencendo(req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<MaterialConsumo>  {
        return await this.materiaisConsumoService.find(id, req.user);
    }
    
    @Post()
    async create(@Body() object: MaterialConsumo, @Request() req) {
        return await this.materiaisConsumoService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: MaterialConsumo, @Request() req) {
        return await this.materiaisConsumoService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.materiaisConsumoService.remove(id, req.user);
    }

    @Post('relatorio')
    async relatorio(@Body() object: any, @Request() req) {
        return await this.materiaisConsumoService.relatorio(object, req.user);
    }
}
