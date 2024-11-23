import { Module } from '@nestjs/common';
import { PoliciaisAtestadosController } from './policiais-atestados.controller';
import { PoliciaisAtestadosService } from './policiais-atestados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicialAtestado } from './policial-atestado.entity';
import { LogsModule } from 'src/logs/logs.module';
import { PoliciaisPublicacoesModule } from 'src/policiais-publicacoes/policiais-publicacoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PolicialAtestado]),
    PoliciaisPublicacoesModule,
    LogsModule,
  ],
  controllers: [PoliciaisAtestadosController],
  providers: [PoliciaisAtestadosService],
  exports: [PoliciaisAtestadosService],
})
export class PoliciaisAtestadosModule {}
