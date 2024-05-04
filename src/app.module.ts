import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { PerfisModule } from './perfis/perfis.module';
import { UsersModule } from './users/users.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { PaisesModule } from './paises/paises.module';
import { EstadosModule } from './estados/estados.module';
import { CidadesModule } from './cidades/cidades.module';
import { UnidadesModule } from './unidades/unidades.module';
import { SubunidadesModule } from './subunidades/subunidades.module';
import { SetoresModule } from './setores/setores.module';
import { GraduacoesModule } from './graduacoes/graduacoes.module';
import { SexosModule } from './sexos/sexos.module';
import { MarcasModule } from './marcas/marcas.module';
import { ModelosModule } from './modelos/modelos.module';
import { PoliciaisModule } from './policiais/policiais.module';
import { PoliciaisAtestadosModule } from './policiais-atestados/policiais-atestados.module';
import { PoliciaisFeriasModule } from './policiais-ferias/policiais-ferias.module';
import { PoliciaisPublicacoesModule } from './policiais-publicacoes/policiais-publicacoes.module';
import { PublicacoesTiposModule } from './publicacoes-tipos/publicacoes-tipos.module';
import { ArmamentosModule } from './armamentos/armamentos.module';
import { ArmamentosTiposModule } from './armamentos-tipos/armamentos-tipos.module';
import { ArmamentosTamanhosModule } from './armamentos-tamanhos/armamentos-tamanhos.module';
import { ArmamentosCalibresModule } from './armamentos-calibres/armamentos-calibres.module';
import { ArmamentosEmprestimosModule } from './armamentos-emprestimos/armamentos-emprestimos.module';
import { ArmamentosEmprestimosItensModule } from './armamentos-emprestimos-itens/armamentos-emprestimos-itens.module';
import { HomeModule } from './home/home.module';
import { CoresModule } from './cores/cores.module';
import { OficinasModule } from './oficinas/oficinas.module';
import { ManutencoesTiposModule } from './manutencoes-tipos/manutencoes-tipos.module';
import { VeiculosTiposModule } from './veiculos-tipos/veiculos-tipos.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { VeiculosOficinasModule } from './veiculos-oficinas/veiculos-oficinas.module';
import { VeiculosPoliciaisModule } from './veiculos-policiais/veiculos-policiais.module';
import { VeiculosPoliciaisAlteracoesModule } from './veiculos-policiais-alteracoes/veiculos-policiais-alteracoes.module';
import { PatrimoniosTiposModule } from './patrimonios-tipos/patrimonios-tipos.module';
import { PatrimoniosModule } from './patrimonios/patrimonios.module';
import { LogsModule } from './logs/logs.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('TORM_HOST'),
        port: +configService.get('TORM_PORT'),
        username: configService.get('TORM_USER'),
        password: configService.get('TORM_PASS'),
        database: configService.get('TORM_DB'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 30,
    }]),
    AuthModule,
    PaisesModule,
    PerfisModule,
    UsersModule,
    UtilitiesModule,
    EstadosModule,
    CidadesModule,
    UnidadesModule,
    SubunidadesModule,
    SetoresModule,
    GraduacoesModule,
    SexosModule,
    MarcasModule,
    ModelosModule,
    PoliciaisModule,
    PoliciaisAtestadosModule,
    PoliciaisFeriasModule,
    PoliciaisPublicacoesModule,
    PublicacoesTiposModule,
    ArmamentosModule,
    ArmamentosTiposModule,
    ArmamentosTamanhosModule,
    ArmamentosCalibresModule,
    ArmamentosEmprestimosModule,
    ArmamentosEmprestimosItensModule,
    HomeModule,
    CoresModule,
    OficinasModule,
    ManutencoesTiposModule,
    VeiculosTiposModule,
    VeiculosModule,
    VeiculosOficinasModule,
    VeiculosPoliciaisModule,
    VeiculosPoliciaisAlteracoesModule,
    PatrimoniosTiposModule,
    PatrimoniosModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
    
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
