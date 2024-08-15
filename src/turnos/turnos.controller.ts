import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { Turno, Turnos } from './turno.interface';


@Controller('turnos')
export class TurnosController {
    constructor(private turnosService: TurnosService){}

    @Get()
    async index():Promise<Turnos>{
        return this.turnosService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Turno>  {
        return await this.turnosService.find(id);
    }
    
    @Post()
    async create(@Body() object: Turno, @Request() req) {
        return await this.turnosService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Turno, @Request() req) {
        return await this.turnosService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.turnosService.remove(id, req.user);
    }
}
