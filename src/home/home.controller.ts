import { Controller, Get, Request, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { Armamentos } from 'src/armamentos/armamento.interface';
import { VeiculosOficinas } from 'src/veiculos-oficinas/veiculo-oficina.interface';
import { Veiculos } from 'src/veiculos/veiculo.interface';
import { VeiculosPoliciais } from 'src/veiculos-policiais/veiculo-policial.interface';
import { ArmamentosEmprestimos } from 'src/armamentos-emprestimos/armamento-emprestimo.interface';
import { MateriaisConsumo } from 'src/materiais-consumo/material-consumo.interface';
import { MateriaisPoliciais } from 'src/materiais-policiais/material-policial.interface';
import { Materiais } from 'src/materiais/material.interface';
import { Contratos } from 'src/contratos/contrato.interface';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get('armamentos-vencendo')
  async armamentosVencendo(
    @Request() req,
    @Query() params: any,
  ): Promise<Armamentos> {
    return this.homeService.armamentosVencendo(params, req.user);
  }

  @Get('armamentos-emprestados')
  async armamentosEmprestimos(
    @Request() req,
    @Query() params: any,
  ): Promise<ArmamentosEmprestimos> {
    return this.homeService.armamentosEmprestados(params, req.user);
  }

  @Get('atestados')
  async atestados(@Request() req, @Query() params: any): Promise<number> {
    return this.homeService.atestados(params, req.user);
  }

  @Get('contratos-acabando')
  async contratosAcabando(
    @Request() req,
    @Query() params: any,
  ): Promise<Contratos> {
    return this.homeService.contratosAcabando(params, req.user);
  }

  @Get('cursos')
  async cursos(@Request() req, @Query() params: any): Promise<number> {
    return this.homeService.cursos(params, req.user);
  }

  @Get('ferias')
  async ferias(@Request() req, @Query() params: any): Promise<number> {
    return this.homeService.ferias(params, req.user);
  }

  @Get('materiais-vencendo')
  async materiaisVencendo(
    @Request() req,
    @Query() params: any,
  ): Promise<Materiais> {
    return this.homeService.materiaisVencendo(params, req.user);
  }

  @Get('materiais-consumo-vencendo')
  async materiaisConsumoVencendo(
    @Request() req,
    @Query() params: any,
  ): Promise<MateriaisConsumo> {
    return this.homeService.materiaisConsumoVencendo(params, req.user);
  }

  @Get('materiais-policiais-emprestados')
  async materiaisPoliciaisEmprestados(
    @Request() req,
    @Query() params: any,
  ): Promise<MateriaisPoliciais> {
    return this.homeService.materiaisEmprestados(params, req.user);
  }

  @Get('materiais-consumo-alerta')
  async materiaisConsumoAlerta(
    @Request() req,
    @Query() params: any,
  ): Promise<MateriaisConsumo> {
    return this.homeService.materiaisAlerta(params, req.user);
  }

  @Get('policiais')
  async policiais(@Request() req, @Query() params: any): Promise<number> {
    return this.homeService.policiais(params, req.user);
  }

  @Get('policiais-inativos')
  async policiaisInativos(
    @Request() req,
    @Query() params: any,
  ): Promise<number> {
    return this.homeService.policiaisInativos(params, req.user);
  }

  @Get('requeridas')
  async requeridas(@Request() req, @Query() params: any): Promise<number> {
    return this.homeService.requeridas(params, req.user);
  }

  @Get('policiais-setores')
  async policiaisSetores(
    @Request() req,
    @Query() params: any,
  ): Promise<number> {
    return this.homeService.policiaisSetores(params, req.user);
  }

  @Get('policiais-graduacoes')
  async policiaisGraduacoes(
    @Request() req,
    @Query() params: any,
  ): Promise<number> {
    return this.homeService.policiaisGraduacoes(params, req.user);
  }

  @Get('policiais-diarias')
  async policiaisDiarias(@Request() req, @Query() params: any): Promise<any> {
    return this.homeService.policiaisDiarias(params, req.user);
  }

  @Get('policiais-diarias-quant')
  async policiaisDiariasQuant(
    @Request() req,
    @Query() params: any,
  ): Promise<any> {
    return this.homeService.policiaisDiariasQuant(params, req.user);
  }

  @Get('policiais-diarias-quantaberto')
  async policiaisDiariasQuantAberto(
    @Request() req,
    @Query() params: any,
  ): Promise<any> {
    return this.homeService.policiaisDiariasQuantAberto(params, req.user);
  }

  @Get('veiculos')
  async veiculos(@Request() req, @Query() params: any): Promise<number> {
    return this.homeService.veiculos(params, req.user);
  }

  @Get('veiculos-viagem')
  async veiculosViagem(@Request() req, @Query() params: any): Promise<number> {
    return this.homeService.veiculosViagem(params, req.user);
  }

  @Get('veiculos-dispviagem')
  async veiculosDispViagem(
    @Request() req,
    @Query() params: any,
  ): Promise<Veiculos> {
    return this.homeService.veiculosDispViagem(params, req.user);
  }

  @Get('veiculos-manutencao')
  async veiculosManutencao(
    @Request() req,
    @Query() params: any,
  ): Promise<VeiculosOficinas> {
    return this.homeService.veiculosManutencao(params, req.user);
  }

  @Get('veiculos-troca-oleo')
  async veiculosTrocaOleo(
    @Request() req,
    @Query() params: any,
  ): Promise<Veiculos> {
    return this.homeService.veiculosTrocaOleo(params, req.user);
  }

  @Get('veiculos-revisao')
  async veiculosRevisao(
    @Request() req,
    @Query() params: any,
  ): Promise<Veiculos> {
    return this.homeService.veiculosRevisao(params, req.user);
  }

  @Get('veiculos-emprestados')
  async veiculosEmprestados(
    @Request() req,
    @Query() params: any,
  ): Promise<VeiculosPoliciais> {
    return this.homeService.veiculosEmprestados(params, req.user);
  }
}
