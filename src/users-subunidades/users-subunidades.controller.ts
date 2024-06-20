import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { UsersSubunidadesService } from './users-subunidades.service';
import { UserSubunidade, UsersSubunidades } from './user-subunidade.interface';

@Controller('users-subunidades')
export class UsersSubunidadesController {
    constructor(private usersSubunidadesService: UsersSubunidadesService){}

    @Get()
    async index():Promise<UsersSubunidades>{
        return this.usersSubunidadesService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<UserSubunidade>  {
        return await this.usersSubunidadesService.find(id);
    }
    
    @Post()
    async create(@Body() object: UserSubunidade, @Request() req) {
        return await this.usersSubunidadesService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: UserSubunidade, @Request() req) {
        return await this.usersSubunidadesService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.usersSubunidadesService.remove(id, req.user);
    }
}
