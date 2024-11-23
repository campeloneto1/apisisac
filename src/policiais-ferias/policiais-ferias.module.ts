import { Module } from '@nestjs/common';
import { PoliciaisFeriasService } from './policiais-ferias.service';
import { PoliciaisFeriasController } from './policiais-ferias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicialFerias } from './policial-ferias.entity';
import { LogsModule } from 'src/logs/logs.module';
import { PoliciaisPublicacoesModule } from 'src/policiais-publicacoes/policiais-publicacoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PolicialFerias]),
    PoliciaisPublicacoesModule,
    LogsModule,
  ],
  providers: [PoliciaisFeriasService],
  controllers: [PoliciaisFeriasController],
  exports: [PoliciaisFeriasService],
})
export class PoliciaisFeriasModule {}
