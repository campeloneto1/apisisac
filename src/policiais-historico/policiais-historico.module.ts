import { Module } from '@nestjs/common';
import { PoliciaisHistoricoService } from './policiais-historico.service';
import { PoliciaisHistoricoController } from './policiais-historico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';
import { PolicialHistorico } from './policial-historico.entity';
import { PoliciaisModule } from 'src/policiais/policiais.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PolicialHistorico]),
    LogsModule,
    PoliciaisModule,
  ],
  providers: [PoliciaisHistoricoService],
  controllers: [PoliciaisHistoricoController],
  exports: [PoliciaisHistoricoService],
})
export class PoliciaisHistoricoModule {}
