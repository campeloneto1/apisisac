import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { ArmamentosService } from 'src/armamentos/armamentos.service';
import { PoliciaisAtestadosService } from 'src/policiais-atestados/policiais-atestados.service';
import { PoliciaisFeriasService } from 'src/policiais-ferias/policiais-ferias.service';
import { PoliciaisService } from 'src/policiais/policiais.service';
import { SetoresService } from 'src/setores/setores.service';
import { User } from 'src/users/user.interface';

@Injectable()
export class HomeService {
    constructor(
        private lazyModuleLoader: LazyModuleLoader,
        private armamentosService: ArmamentosService,
        private policiaisService: PoliciaisService,
        private policiaisAtestadosService: PoliciaisAtestadosService,
        private policiaisFeriasService: PoliciaisFeriasService,
        private setoresService: SetoresService

    ){}

    async policiais(idUser: User): Promise<number> {
        return this.policiaisService.quantidade(idUser)
    }

    async atestados(idUser: User): Promise<number> {
        return this.policiaisAtestadosService.quantidade(idUser);
    }

    async ferias(idUser: User): Promise<number> {
        return this.policiaisFeriasService.quantidade(idUser);
    }

    async policiaisSetores(): Promise<any>{
        return this.setoresService.policiaisSetor();
    }

    async armamentosVencendo(idUser: User): Promise<any>{
        return this.armamentosService.vencendo(idUser);
    }

}
