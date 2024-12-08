import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { ArmamentosEmprestimos } from 'src/armamentos-emprestimos/armamento-emprestimo.interface';
import { ArmamentosEmprestimosService } from 'src/armamentos-emprestimos/armamentos-emprestimos.service';
import { Armamentos } from 'src/armamentos/armamento.interface';
import { ArmamentosService } from 'src/armamentos/armamentos.service';
import { Contratos } from 'src/contratos/contrato.interface';
import { ContratosService } from 'src/contratos/contratos.service';
import { GraduacoesService } from 'src/graduacoes/graduacoes.service';
import { MateriaisConsumoService } from 'src/materiais-consumo/materiais-consumo.service';
import { MateriaisConsumo } from 'src/materiais-consumo/material-consumo.interface';
import { MateriaisPoliciaisService } from 'src/materiais-policiais/materiais-policiais.service';
import { MateriaisPoliciais } from 'src/materiais-policiais/material-policial.interface';
import { MateriaisService } from 'src/materiais/materiais.service';
import { Materiais } from 'src/materiais/material.interface';
import { PoliciaisAtestadosService } from 'src/policiais-atestados/policiais-atestados.service';
import { PoliciaisCursosService } from 'src/policiais-cursos/policiais-cursos.service';
import { PoliciaisDiariasService } from 'src/policiais-diarias/policiais-diarias.service';
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
    private contratosService: ContratosService,
    private graduacoesService: GraduacoesService,
    private materiaisService: MateriaisService,
    private materiaisConsumoService: MateriaisConsumoService,
    private materiaisPoliciaisService: MateriaisPoliciaisService,
    private policiaisService: PoliciaisService,
    private policiaisDiariasService: PoliciaisDiariasService,
    private policiaisAtestadosService: PoliciaisAtestadosService,
    private policiaisCursosService: PoliciaisCursosService,
    private policiaisFeriasService: PoliciaisFeriasService,
    private policiaisRequeridas: PoliciaisRequeridasService,
    private veiculosService: VeiculosService,
    private veiculosOficinasService: VeiculosOficinasService,
    private veiculosPoliciaisService: VeiculosPoliciaisService,
    private setoresService: SetoresService,
  ) {}

  async armamentosEmprestados(
    params: any,
    idUser: User,
  ): Promise<ArmamentosEmprestimos> {
    return this.armamentosEmprestimosService.emprestados(params, idUser);
  }

  async armamentosVencendo(params: any, idUser: User): Promise<Armamentos> {
    return this.armamentosService.vencendo(params, idUser);
  }

  async atestados(params: any, idUser: User): Promise<number> {
    return this.policiaisAtestadosService.quantidade(params, idUser);
  }

  async contratosAcabando(params: any, idUser: User): Promise<Contratos> {
    return this.contratosService.acabando(params, idUser);
  }

  async cursos(params: any, idUser: User): Promise<number> {
    return this.policiaisCursosService.quantidade(params, idUser);
  }

  async ferias(params: any, idUser: User): Promise<number> {
    return this.policiaisFeriasService.quantidade(params, idUser);
  }

  async materiaisConsumoVencendo(
    params: any,
    idUser: User,
  ): Promise<MateriaisConsumo> {
    return this.materiaisConsumoService.vencendo(params, idUser);
  }

  async materiaisAlerta(params: any, idUser: User): Promise<MateriaisConsumo> {
    return this.materiaisConsumoService.alerta(params, idUser);
  }

  async materiaisEmprestados(
    params: any,
    idUser: User,
  ): Promise<MateriaisPoliciais> {
    return this.materiaisPoliciaisService.emprestados(params, idUser);
  }

  async materiaisVencendo(params: any, idUser: User): Promise<Materiais> {
    return this.materiaisService.vencendo(params, idUser);
  }

  async policiais(params: any, idUser: User): Promise<number> {
    return this.policiaisService.quantidade(params, idUser);
  }

  async policiaisDiariasQuant(params: any, idUser: User): Promise<number> {
    return this.policiaisDiariasService.quantidade(params, idUser);
  }

  async policiaisDiariasQuantAberto(
    params: any,
    idUser: User,
  ): Promise<number> {
    return this.policiaisDiariasService.quantidadeEmAberto(params, idUser);
  }

  async policiaisDiarias(params: any, idUser: User): Promise<any> {
    return this.policiaisDiariasService.quantidadePorPol(params, idUser);
  }

  async policiaisInativos(params: any, idUser: User): Promise<number> {
    return this.policiaisService.quantidadeInativos(params, idUser);
  }

  async policiaisGraduacoes(params: any, idUser: User): Promise<any> {
    return this.graduacoesService.policiaisGraduacoes(params, idUser);
  }

  async policiaisSetores(params: any, idUser: User): Promise<any> {
    return this.setoresService.policiaisSetor(params, idUser);
  }

  async requeridas(params: any, idUser: User): Promise<any> {
    return this.policiaisRequeridas.quantidade(params, idUser);
  }

  async veiculos(params: any, idUser: User): Promise<number> {
    return this.veiculosService.quantidade(params, idUser);
  }

  async veiculosViagem(params: any, idUser: User): Promise<number> {
    return this.veiculosService.quantidadeViagem(params, idUser);
  }

  async veiculosDispViagem(params: any, idUser: User): Promise<Veiculos> {
    return this.veiculosService.disponiveisViagem(params, idUser);
  }

  async veiculosManutencao(
    params: any,
    idUser: User,
  ): Promise<VeiculosOficinas> {
    return this.veiculosOficinasService.emmanutencao(params, idUser);
  }

  async veiculosTrocaOleo(params: any, idUser: User): Promise<Veiculos> {
    return this.veiculosService.trocaoleo(params, idUser);
  }

  async veiculosRevisao(params: any, idUser: User): Promise<Veiculos> {
    return this.veiculosService.revisao(params, idUser);
  }

  async veiculosEmprestados(
    params: any,
    idUser: User,
  ): Promise<VeiculosPoliciais> {
    return this.veiculosPoliciaisService.emprestados(params, idUser);
  }
}
