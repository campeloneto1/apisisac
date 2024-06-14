import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './contrato.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contrato]),
    LogsModule
  ],
  providers: [ContratosService],
  controllers: [ContratosController],
  exports: [ContratosService]
})
export class ContratosModule {}
