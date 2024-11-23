import { Module } from '@nestjs/common';
import { ArmamentosEmprestimosService } from './armamentos-emprestimos.service';
import { ArmamentosEmprestimosController } from './armamentos-emprestimos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmamentoEmprestimo } from './armamento-emprestimo.entity';
import { ArmamentosEmprestimosItensModule } from 'src/armamentos-emprestimos-itens/armamentos-emprestimos-itens.module';
import { ArmamentosModule } from 'src/armamentos/armamentos.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArmamentoEmprestimo]),
    ArmamentosEmprestimosItensModule,
    ArmamentosModule,
    LogsModule,
  ],
  providers: [ArmamentosEmprestimosService],
  controllers: [ArmamentosEmprestimosController],
  exports: [ArmamentosEmprestimosService],
})
export class ArmamentosEmprestimosModule {}
