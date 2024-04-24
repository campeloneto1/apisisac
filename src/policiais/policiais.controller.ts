import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { PoliciaisService } from './policiais.service';
import { Policiais, Policial } from './policial.interface';


@Controller('policiais')
export class PoliciaisController {
    constructor(private policiaisService: PoliciaisService){}

    @Get()
    async index():Promise<Policiais>{
        return this.policiaisService.index();
    }

    @Get('disponiveis')
    async disponiveis():Promise<Policiais>{
        return this.policiaisService.disponiveis();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Policial>  {
        return await this.policiaisService.find(id);
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
}
