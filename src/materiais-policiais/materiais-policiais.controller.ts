import { Controller,  Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { MateriaisPoliciais, MaterialPolicial } from './material-policial.interface';
import { MateriaisPoliciaisService } from './materiais-policiais.service';

@Controller('materiais-policiais')
export class MateriaisPoliciaisController {
    constructor(private materiaisPoliciaisService: MateriaisPoliciaisService){}

    @Get()
    async index(@Request() req):Promise<MateriaisPoliciais>{
        return this.materiaisPoliciaisService.index(req.user);
    }

    @Get(':id')
    async find(@Param('id') id: number, @Request() req):Promise<MaterialPolicial>  {
        return await this.materiaisPoliciaisService.find(id, req.user);
    }
    
    @Post()
    async create(@Body() object: MaterialPolicial, @Request() req) {
        return await this.materiaisPoliciaisService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: MaterialPolicial, @Request() req) {
        return await this.materiaisPoliciaisService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.materiaisPoliciaisService.remove(id, req.user);
    }

    @Post('receber')
    async receber(@Body() object: any, @Request() req) {
        return await this.materiaisPoliciaisService.receber(object, req.user);
    }

    @Post('relatorio')
    async relatorio(@Body() object: any, @Request() req) {
        return await this.materiaisPoliciaisService.relatorio(object, req.user);
    }
}
