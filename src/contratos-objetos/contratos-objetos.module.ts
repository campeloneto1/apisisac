import { Module } from '@nestjs/common';
import { ContratosObjetosService } from './contratos-objetos.service';
import { ContratosObjetosController } from './contratos-objetos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';
import { ContratoObjeto } from './contrato-objeto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContratoObjeto]),
    LogsModule
  ],
  providers: [ContratosObjetosService],
  controllers: [ContratosObjetosController],
  exports: [ContratosObjetosService]
})
export class ContratosObjetosModule {}
