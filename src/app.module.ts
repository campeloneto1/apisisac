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
