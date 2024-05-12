import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { HomeService } from './home.service';
import { Armamentos } from 'src/armamentos/armamento.interface';
import { VeiculosOficinas } from 'src/veiculos-oficinas/veiculo-oficina.interface';
import { Veiculos } from 'src/veiculos/veiculo.interface';
import { VeiculosPoliciais } from 'src/veiculos-policiais/veiculo-policial.interface';
import { ArmamentosEmprestimos } from 'src/armamentos-emprestimos/armamento-emprestimo.interface';
import { MateriaisConsumo } from 'src/materiais-consumo/material-consumo.interface';
import { MateriaisPoliciais } from 'src/materiais-policiais/material-policial.interface';

@Controller('home')
export class HomeController {
    constructor(private homeService: HomeService){}

    @Get('armamentos-vencendo')
    async armamentosVencendo(@Request() req):Promise<Armamentos>{
        return this.homeService.armamentosVencendo(req.user);
    }

    @Get('armamentos-emprestados')
    async armamentosEmprestimos(@Request() req):Promise<ArmamentosEmprestimos>{
        return this.homeService.armamentosEmprestados(req.user);
    }

    @Get('materiais-consumo-vencendo')
    async materiaisConsumoVencendo(@Request() req):Promise<MateriaisConsumo>{
        return this.homeService.materiaisVencendo(req.user);
    }

    @Get('materiais-policiais-emprestados')
    async materiaisPoliciaisEmprestados(@Request() req):Promise<MateriaisPoliciais>{
        return this.homeService.materiaisEmprestados(req.user);
    }

    @Get('materiais-consumo-alerta')
    async materiaisConsumoAlerta(@Request() req):Promise<MateriaisConsumo>{
        return this.homeService.materiaisAlerta(req.user);
    }


    @Get('policiais')
    async policiais(@Request() req):Promise<number>{
        return this.homeService.policiais(req.user);
    }

    @Get('atestados')
    async atestados(@Request() req):Promise<number>{
        return this.homeService.atestados(req.user);
    }

    @Get('ferias')
    async ferias(@Request() req):Promise<number>{
        return this.homeService.ferias(req.user);
    }

    @Get('policiais-setores')
    async policiaisSetores(@Request() req):Promise<number>{
        return this.homeService.policiaisSetores(req.user);
    }

    @Get('policiais-graduacoes')
    async policiaisGraduacoes(@Request() req):Promise<number>{
        return this.homeService.policiaisGraduacoes(req.user);
    }


    @Get('veiculos-manutencao')
    async veiculosManutencao(@Request() req):Promise<VeiculosOficinas>{
        return this.homeService.veiculosManutencao(req.user);
    }

    @Get('veiculos-troca-oleo')
    async veiculosTrocaOleo(@Request() req):Promise<Veiculos>{
        return this.homeService.veiculosTrocaOleo(req.user);
    }

    @Get('veiculos-emprestados')
    async veiculosEmprestados(@Request() req):Promise<VeiculosPoliciais>{
        return this.homeService.veiculosEmprestados(req.user);
    }
}
