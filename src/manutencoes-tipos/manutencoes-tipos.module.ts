import { Module } from '@nestjs/common';
import { ManutencoesTiposService } from './manutencoes-tipos.service';
import { ManutencoesTiposController } from './manutencoes-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManutencaoTipo } from './manutencao-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManutencaoTipo]), LogsModule],
  providers: [ManutencoesTiposService],
  controllers: [ManutencoesTiposController],
  exports: [ManutencoesTiposService],
})
export class ManutencoesTiposModule {}
