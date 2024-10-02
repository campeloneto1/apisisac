import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { PoliciaisModule } from 'src/policiais/policiais.module';
import { PoliciaisAtestadosModule } from 'src/policiais-atestados/policiais-atestados.module';
import { PoliciaisFeriasModule } from 'src/policiais-ferias/policiais-ferias.module';
import { SetoresModule } from 'src/setores/setores.module';
import { ArmamentosModule } from 'src/armamentos/armamentos.module';
import { VeiculosOficinasModule } from 'src/veiculos-oficinas/veiculos-oficinas.module';
import { VeiculosModule } from 'src/veiculos/veiculos.module';
import { VeiculosPoliciaisModule } from 'src/veiculos-policiais/veiculos-policiais.module';
import { ArmamentosEmprestimosModule } from 'src/armamentos-emprestimos/armamentos-emprestimos.module';
import { GraduacoesModule } from 'src/graduacoes/graduacoes.module';
import { MateriaisConsumoModule } from 'src/materiais-consumo/materiais-consumo.module';
import { MateriaisPoliciaisModule } from 'src/materiais-policiais/materiais-policiais.module';
import { MateriaisModule } from 'src/materiais/materiais.module';
import { PoliciaisRequeridasModule } from 'src/policiais-requeridas/policiais-requeridas.module';
import { ContratosModule } from 'src/contratos/contratos.module';
import { PoliciaisCursosModule } from 'src/policiais-cursos/policiais-cursos.module';


@Module({
  imports: [
    ArmamentosModule,
    ArmamentosEmprestimosModule,
    ContratosModule,
    GraduacoesModule,
    MateriaisModule,
    MateriaisConsumoModule,
    MateriaisPoliciaisModule,
    PoliciaisModule,
    PoliciaisAtestadosModule,
    PoliciaisFeriasModule,
    PoliciaisRequeridasModule,
    PoliciaisCursosModule,
    SetoresModule,
    VeiculosModule,
    VeiculosOficinasModule,
    VeiculosPoliciaisModule,
    VeiculosModule
  ],
  providers: [HomeService],
  controllers: [HomeController],
  exports: [HomeService]
})
export class HomeModule {}
