import { Controller, Post, Body, Get, Param, Put, Delete, Request  } from '@nestjs/common';
import { PoliciaisRequeridasService } from './policiais-requeridas.service';
import { PolicialRequerida, PoliciaisRequeridas } from './policial-requerida.interface';

@Controller('policiais-requeridas')
export class PoliciaisRequeridasController {
    constructor(private policiaisRequeridasService: PoliciaisRequeridasService){}

    @Get()
    async index(@Request() req):Promise<PoliciaisRequeridas>{
        return this.policiaisRequeridasService.index(req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<PolicialRequerida>  {
        return await this.policiaisRequeridasService.find(id, req.user);
    }
    
    @Post()
    async create(@Body() object: PolicialRequerida, @Request() req) {
        return await this.policiaisRequeridasService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: PolicialRequerida, @Request() req) {
        return await this.policiaisRequeridasService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.policiaisRequeridasService.remove(id, req.user);
    }
}
