import { Module } from '@nestjs/common';
import { ContratosTiposService } from './contratos-tipos.service';
import { ContratosTiposController } from './contratos-tipos.controller';

@Module({
  providers: [ContratosTiposService],
  controllers: [ContratosTiposController]
})
export class ContratosTiposModule {}
