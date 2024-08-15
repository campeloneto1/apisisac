import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { PostosTurnosService } from './postos-turnos.service';
import { PostoTurno, PostosTurnos } from './posto-turno.interface';

@Controller('postos-turnos')
export class PostosTurnosController {
    constructor(private postosService: PostosTurnosService){}

    @Get()
    async index():Promise<PostosTurnos>{
        return this.postosService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<PostoTurno>  {
        return await this.postosService.find(id);
    }
    
    @Post()
    async create(@Body() object: PostoTurno, @Request() req) {
        return await this.postosService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: PostoTurno, @Request() req) {
        return await this.postosService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.postosService.remove(id, req.user);
    }
}
