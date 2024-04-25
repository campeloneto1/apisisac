import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { PoliciaisAtestadosService } from 'src/policiais-atestados/policiais-atestados.service';
import { PoliciaisFeriasService } from 'src/policiais-ferias/policiais-ferias.service';
import { PoliciaisService } from 'src/policiais/policiais.service';

@Injectable()
export class HomeService {
    constructor(
        private lazyModuleLoader: LazyModuleLoader,
        private policiaisService: PoliciaisService,
        private policiaisAtestadosService: PoliciaisAtestadosService,
        private policiaisFeriasService: PoliciaisFeriasService

    ){}

    async policiais(): Promise<number> {
        return this.policiaisService.quantidade()
    }

    async atestados(): Promise<number> {
        return this.policiaisAtestadosService.quantidade();
    }

    async ferias(): Promise<number> {
        return this.policiaisFeriasService.quantidade();
    }
}
