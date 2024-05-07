import { Module } from '@nestjs/common';
import { ArmamentosTiposService } from './armamentos-tipos.service';
import { ArmamentosTiposController } from './armamentos-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmamentoTipo } from './armamento-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArmamentoTipo]),
    LogsModule
  ],
  providers: [ArmamentosTiposService],
  controllers: [ArmamentosTiposController],
  exports: [ArmamentosTiposService]
})
export class ArmamentosTiposModule {}
