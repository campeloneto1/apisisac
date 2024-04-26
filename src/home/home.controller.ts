import { Controller, Post, Body, Get, Param, Put, Delete, Request } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private homeService: HomeService){}

    @Get('policiais')
    async policiais():Promise<number>{
        return this.homeService.policiais();
    }

    @Get('atestados')
    async atestados():Promise<number>{
        return this.homeService.atestados();
    }

    @Get('ferias')
    async ferias():Promise<number>{
        return this.homeService.ferias();
    }

    @Get('policiaisSetores')
    async policiaisSetores():Promise<number>{
        return this.homeService.policiaisSetores();
    }
}
