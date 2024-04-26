import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { HomeService } from './home.service';
import { Armamentos } from 'src/armamentos/armamento.interface';

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
        return this.homeService.policiaisSetores();
    }

    @Get('armamentos-vencendo')
    async armamentosVencendo(@Request() req):Promise<Armamentos>{
        return this.homeService.armamentosVencendo(req.user);
    }
}
