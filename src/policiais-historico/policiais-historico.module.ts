import { Module } from '@nestjs/common';
import { PoliciaisHistoricoService } from './policiais-historico.service';
import { PoliciaisHistoricoController } from './policiais-historico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';
import { PolicialHistorico } from './policial-historico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PolicialHistorico]), LogsModule],
  providers: [PoliciaisHistoricoService],
  controllers: [PoliciaisHistoricoController],
  exports: [PoliciaisHistoricoService],
})
export class PoliciaisHistoricoModule {}
