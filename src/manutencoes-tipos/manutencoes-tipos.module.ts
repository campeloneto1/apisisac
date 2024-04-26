import { Module } from '@nestjs/common';
import { ManutencoesTiposService } from './manutencoes-tipos.service';
import { ManutencoesTiposController } from './manutencoes-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManutencaoTipo } from './manutencao-tipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManutencaoTipo])],
  providers: [ManutencoesTiposService],
  controllers: [ManutencoesTiposController],
  exports: [ManutencoesTiposService]
})
export class ManutencoesTiposModule {}
