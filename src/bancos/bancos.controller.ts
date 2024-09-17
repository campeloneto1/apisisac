import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { BancosService } from './bancos.service';
import { Banco, Bancos } from './banco.interface';

@Controller('bancos')
export class BancosController {
    constructor(private bancosTiposService: BancosService){}

    @Get()
    async index():Promise<Bancos>{
        return this.bancosTiposService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Banco>  {
        return await this.bancosTiposService.find(id);
    }
    
    @Post()
    async create(@Body() object: Banco, @Request() req) {
        return await this.bancosTiposService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Banco, @Request() req) {
        return await this.bancosTiposService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.bancosTiposService.remove(id, req.user);
    }
}
