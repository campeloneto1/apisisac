import { Controller,  Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { Materiais, Material } from './material.interface';
import { MateriaisService } from './materiais.service';

@Controller('materiais')
export class MateriaisController {
    constructor(private materiaisService: MateriaisService){}

    @Get()
    async index(@Request() req):Promise<Materiais>{
        return this.materiaisService.index(req.user);
    }

    @Get('disponiveis')
    async disponiveis(@Request() req):Promise<Materiais>{
        return this.materiaisService.disponiveis(req.user);
    }

    @Get('vencendo')
    async vencendo(@Request() req):Promise<Materiais>{
        return this.materiaisService.vencendo(req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<Material>  {
        return await this.materiaisService.find(id, req.user);
    }
    
    @Post()
    async create(@Body() object: Material, @Request() req) {
        return await this.materiaisService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Material, @Request() req) {
        return await this.materiaisService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.materiaisService.remove(id, req.user);
    }

    @Post('relatorio')
    async relatorio(@Body() object: any, @Request() req) {
        return await this.materiaisService.relatorio(object, req.user);
    }
}
