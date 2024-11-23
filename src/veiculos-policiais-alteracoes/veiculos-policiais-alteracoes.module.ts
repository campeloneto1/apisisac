import { Module } from '@nestjs/common';
import { VeiculosPoliciaisAlteracoesService } from './veiculos-policiais-alteracoes.service';
import { VeiculosPoliciaisAlteracoesController } from './veiculos-policiais-alteracoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoPolicialAlteracao } from './veiculo-policial-alteracao.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoPolicialAlteracao]), LogsModule],
  providers: [VeiculosPoliciaisAlteracoesService],
  controllers: [VeiculosPoliciaisAlteracoesController],
  exports: [VeiculosPoliciaisAlteracoesService],
})
export class VeiculosPoliciaisAlteracoesModule {}
