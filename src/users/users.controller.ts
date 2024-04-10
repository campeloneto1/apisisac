import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { User, Users } from './user.interface'
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}
    
    @Get()
    async index():Promise<Users> {
        return await this.usersService.index();
    }
    
    @Get(':id')
    async find(@Param('id') id: number):Promise<User>  {
        return await this.usersService.find(id);
    }
    
    @Post()
    async create(@Body() object: User, @Request() req) {
        return await this.usersService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: User, @Request() req) {
        return await this.usersService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.usersService.remove(id, req);
    }
}
