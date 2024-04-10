import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
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
    async create(@Body() object: User) {
        return await this.usersService.create(object);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: User) {
        return await this.usersService.update(id, object);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.usersService.remove(id);
    }
}
