import { Module } from '@nestjs/common';
import { ContratosLancamentosService } from './contratos-lancamentos.service';
import { ContratosLancamentosController } from './contratos-lancamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratoLancamento } from './contrato-lancamento.entity';
import { LogsModule } from 'src/logs/logs.module';
import { ContratosModule } from 'src/contratos/contratos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContratoLancamento]),
    ContratosModule,
    LogsModule,
  ],
  providers: [ContratosLancamentosService],
  controllers: [ContratosLancamentosController],
  exports: [ContratosLancamentosService],
})
export class ContratosLancamentosModule {}
