import { Module } from '@nestjs/common';
import { ArmamentosEmprestimosService } from './armamentos-emprestimos.service';
import { ArmamentosEmprestimosController } from './armamentos-emprestimos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmamentoEmprestimo } from './armamento-emprestimo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArmamentoEmprestimo])],
  providers: [ArmamentosEmprestimosService],
  controllers: [ArmamentosEmprestimosController],
  exports: [ArmamentosEmprestimosService]
})
export class ArmamentosEmprestimosModule {}
