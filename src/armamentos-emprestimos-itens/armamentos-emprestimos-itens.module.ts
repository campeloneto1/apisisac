import { Module } from '@nestjs/common';
import { ArmamentosEmprestimosItensService } from './armamentos-emprestimos-itens.service';
import { ArmamentosEmprestimosItensController } from './armamentos-emprestimos-itens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmamentoEmprestimoItem } from './armamento-emprestimo-item.entity';
import { ArmamentosModule } from 'src/armamentos/armamentos.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArmamentoEmprestimoItem]), ArmamentosModule],
  providers: [ArmamentosEmprestimosItensService],
  controllers: [ArmamentosEmprestimosItensController],
  exports: [ArmamentosEmprestimosItensService]
})
export class ArmamentosEmprestimosItensModule {}
