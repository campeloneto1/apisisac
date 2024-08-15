import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { PostosService } from './postos.service';
import { Posto, Postos } from './posto.interface';

@Controller('postos')
export class PostosController {
    constructor(private postosService: PostosService){}

    @Get()
    async index():Promise<Postos>{
        return this.postosService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<Posto>  {
        return await this.postosService.find(id);
    }
    
    @Post()
    async create(@Body() object: Posto, @Request() req) {
        return await this.postosService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: Posto, @Request() req) {
        return await this.postosService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.postosService.remove(id, req.user);
    }
}
