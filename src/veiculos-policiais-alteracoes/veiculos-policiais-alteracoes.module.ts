import { Module } from '@nestjs/common';
import { VeiculosPoliciaisAlteracoesService } from './veiculos-policiais-alteracoes.service';
import { VeiculosPoliciaisAlteracoesController } from './veiculos-policiais-alteracoes.controller';

@Module({
  providers: [VeiculosPoliciaisAlteracoesService],
  controllers: [VeiculosPoliciaisAlteracoesController]
})
export class VeiculosPoliciaisAlteracoesModule {}
