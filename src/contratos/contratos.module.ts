import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './contrato.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contrato])
  ],
  providers: [ContratosService],
  controllers: [ContratosController],
  exports: [ContratosService]
})
export class ContratosModule {}
