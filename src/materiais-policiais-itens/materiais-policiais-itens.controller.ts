import { Controller,  Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { MateriaisPoliciaisItens, MaterialPolicialItem } from './material-policial-item.interface';
import { MateriaisPoliciaisItensService } from './materiais-policiais-itens.service';

@Controller('materiais-policiais-itens')
export class MateriaisPoliciaisItensController {
    constructor(private materiaisPoliciaisItensService: MateriaisPoliciaisItensService){}

    @Get()
    async index():Promise<MateriaisPoliciaisItens>{
        return this.materiaisPoliciaisItensService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<MaterialPolicialItem>  {
        return await this.materiaisPoliciaisItensService.find(id);
    }
    
    @Post()
    async create(@Body() object: MaterialPolicialItem, @Request() req) {
        return await this.materiaisPoliciaisItensService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: MaterialPolicialItem, @Request() req) {
        return await this.materiaisPoliciaisItensService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.materiaisPoliciaisItensService.remove(id, req.user);
    }
}
