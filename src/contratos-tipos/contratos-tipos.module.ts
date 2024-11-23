import { Module } from '@nestjs/common';
import { ContratosTiposService } from './contratos-tipos.service';
import { ContratosTiposController } from './contratos-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoTipo } from './contrato-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContratoTipo]), LogsModule],
  providers: [ContratosTiposService],
  controllers: [ContratosTiposController],
  exports: [ContratosTiposService],
})
export class ContratosTiposModule {}
