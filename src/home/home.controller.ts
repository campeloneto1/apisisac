import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { HomeService } from './home.service';
import { Armamentos } from 'src/armamentos/armamento.interface';
import { VeiculosOficinas } from 'src/veiculos-oficinas/veiculo-oficina.interface';
import { Veiculos } from 'src/veiculos/veiculo.interface';

@Controller('home')
export class HomeController {
    constructor(private homeService: HomeService){}

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

    @Get('armamentos-vencendo')
    async armamentosVencendo(@Request() req):Promise<Armamentos>{
        return this.homeService.armamentosVencendo(req.user);
    }

    @Get('veiculos-manutencao')
    async veiculosManutencao(@Request() req):Promise<VeiculosOficinas>{
        return this.homeService.veiculosManutencao(req.user);
    }

    @Get('veiculos-troca-oleo')
    async veiculosTrocaOleo(@Request() req):Promise<Veiculos>{
        return this.homeService.veiculosTrocaOleo(req.user);
    }
}
