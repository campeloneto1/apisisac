import { Controller, Post, Body, Get, Param, Put, Delete, Request, Query } from '@nestjs/common';
import { PoliciaisService } from './policiais.service';
import { Policiais, Policial } from './policial.interface';


@Controller('policiais')
export class PoliciaisController {
    constructor(private policiaisService: PoliciaisService){}

    @Get()
    async index(@Request() req, @Query() params: any):Promise<Policiais>{
        return this.policiaisService.index(params, req.user);
    }

    @Get('disponiveis')
    async disponiveis(@Request() req, @Query() params: any):Promise<Policiais>{
        return this.policiaisService.disponiveis(params, req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<Policial>  {
        return await this.policiaisService.find2(id, req.user);
    }
    
    @Post()
    async create(@Body() object: Policial, @Request() req) {
        return await this.policiaisService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Policial, @Request() req) {
        return await this.policiaisService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.policiaisService.remove(id, req.user);
    }

    @Post('relatorio')
    async relatorio(@Body() object: Policial, @Request() req) {
        return await this.policiaisService.relatorio(object, req.user);
    }

    @Put(':id/updatefoto')
    async updateFoto(@Param('id') id: number, @Body() object: Policial, @Request() req) {
        return await this.policiaisService.updateFoto(id, object, req.user);
    }
}
