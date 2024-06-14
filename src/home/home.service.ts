import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { ArmamentosEmprestimos } from 'src/armamentos-emprestimos/armamento-emprestimo.interface';
import { ArmamentosEmprestimosService } from 'src/armamentos-emprestimos/armamentos-emprestimos.service';
import { Armamentos } from 'src/armamentos/armamento.interface';
import { ArmamentosService } from 'src/armamentos/armamentos.service';
import { GraduacoesService } from 'src/graduacoes/graduacoes.service';
import { MateriaisConsumoService } from 'src/materiais-consumo/materiais-consumo.service';
import { MateriaisConsumo } from 'src/materiais-consumo/material-consumo.interface';
import { MateriaisPoliciaisService } from 'src/materiais-policiais/materiais-policiais.service';
import { MateriaisPoliciais } from 'src/materiais-policiais/material-policial.interface';
import { MateriaisService } from 'src/materiais/materiais.service';
import { Materiais } from 'src/materiais/material.interface';
import { PoliciaisAtestadosService } from 'src/policiais-atestados/policiais-atestados.service';
import { PoliciaisFeriasService } from 'src/policiais-ferias/policiais-ferias.service';
import { PoliciaisRequeridasService } from 'src/policiais-requeridas/policiais-requeridas.service';
import { PoliciaisService } from 'src/policiais/policiais.service';
import { SetoresService } from 'src/setores/setores.service';
import { User } from 'src/users/user.interface';
import { VeiculosOficinas } from 'src/veiculos-oficinas/veiculo-oficina.interface';
import { VeiculosOficinasService } from 'src/veiculos-oficinas/veiculos-oficinas.service';
import { VeiculosPoliciais } from 'src/veiculos-policiais/veiculo-policial.interface';
import { VeiculosPoliciaisService } from 'src/veiculos-policiais/veiculos-policiais.service';
import { Veiculos } from 'src/veiculos/veiculo.interface';
import { VeiculosService } from 'src/veiculos/veiculos.service';

@Injectable()
export class HomeService {
    constructor(
        private lazyModuleLoader: LazyModuleLoader,
        private armamentosService: ArmamentosService,
        private armamentosEmprestimosService: ArmamentosEmprestimosService,
        private graduacoesService: GraduacoesService,
        private materiaisService: MateriaisService,
        private materiaisConsumoService: MateriaisConsumoService,
        private materiaisPoliciaisService: MateriaisPoliciaisService,
        private policiaisService: PoliciaisService,
        private policiaisAtestadosService: PoliciaisAtestadosService,
        private policiaisFeriasService: PoliciaisFeriasService,
        private policiaisRequeridas: PoliciaisRequeridasService,
        private veiculosService: VeiculosService,
        private veiculosOficinasService: VeiculosOficinasService,
        private veiculosPoliciaisService: VeiculosPoliciaisService,
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

    async requeridas(idUser: User): Promise<any>{
        return this.policiaisRequeridas.quantidade(idUser);
    }

    async policiaisGraduacoes(idUser: User): Promise<any>{
        return this.graduacoesService.policiaisGraduacoes(idUser);
    }

    async policiaisSetores(idUser: User): Promise<any>{
        return this.setoresService.policiaisSetor(idUser);
    }

    async armamentosVencendo(idUser: User): Promise<Armamentos>{
        return this.armamentosService.vencendo(idUser);
    }

    async armamentosEmprestados(idUser: User): Promise<ArmamentosEmprestimos>{
        return this.armamentosEmprestimosService.emprestados(idUser);
    }

    async veiculosManutencao(idUser: User): Promise<VeiculosOficinas>{
        return this.veiculosOficinasService.emmanutencao(idUser);
    }

    async veiculosTrocaOleo(idUser: User): Promise<Veiculos>{
        return this.veiculosService.trocaoleo(idUser);
    }

    async veiculosRevisao(idUser: User): Promise<Veiculos>{
        return this.veiculosService.revisao(idUser);
    }

    async veiculosEmprestados(idUser: User): Promise<VeiculosPoliciais>{
        return this.veiculosPoliciaisService.emprestados(idUser);
    }

    async materiaisConsumoVencendo(idUser: User): Promise<MateriaisConsumo>{
        return this.materiaisConsumoService.vencendo(idUser);
    }

    async materiaisAlerta(idUser: User): Promise<MateriaisConsumo>{
        return this.materiaisConsumoService.alerta(idUser);
    }

    async materiaisEmprestados(idUser: User): Promise<MateriaisPoliciais>{
        return this.materiaisPoliciaisService.emprestados(idUser);
    }

    async materiaisVencendo(idUser: User): Promise<Materiais>{
        return this.materiaisService.vencendo(idUser);
    }

}
