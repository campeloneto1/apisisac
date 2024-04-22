import { Controller,  Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { ArmamentoEmprestimoItem,ArmamentosEmprestimosItens } from './armamento-emprestimo-item.interface';
import { ArmamentosEmprestimosItensService } from './armamentos-emprestimos-itens.service';

@Controller('armamentos-emprestimos-itens')
export class ArmamentosEmprestimosItensController {
    constructor(private armamentosEmprestimosItensService: ArmamentosEmprestimosItensService){}

    @Get()
    async index():Promise<ArmamentosEmprestimosItens>{
        return this.armamentosEmprestimosItensService.index();
    }

    @Get(':id')
    async find(@Param('id') id: number):Promise<ArmamentoEmprestimoItem>  {
        return await this.armamentosEmprestimosItensService.find(id);
    }
    
    @Post()
    async create(@Body() object: ArmamentoEmprestimoItem, @Request() req) {
        return await this.armamentosEmprestimosItensService.create(object, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() object: ArmamentoEmprestimoItem, @Request() req) {
        return await this.armamentosEmprestimosItensService.update(id, object, req.user);
    }

    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        return await this.armamentosEmprestimosItensService.remove(id, req.user);
    }
}
