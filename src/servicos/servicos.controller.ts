import { Controller, Post, Body, Get, Param, Put, Delete, Request, Query } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { Servico, Servicos} from './servico.interface';

@Controller('servicos')
export class ServicosController {
    constructor(private servicosService: ServicosService){}

    @Get()
    async index(@Request() req, @Query() params: any):Promise<Servicos>{
        return this.servicosService.index(params, req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<Servico>  {
        return await this.servicosService.find(id, req.user);
    }
    
    @Post()
    async create(@Body() object: Servico, @Request() req) {
        return await this.servicosService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Servico, @Request() req) {
        return await this.servicosService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.servicosService.remove(id, req.user);
    }

    @Post('relatorio')
    async relatorio(@Body() object: any, @Request() req) {
        return await this.servicosService.relatorio(object, req.user);
    }
}
