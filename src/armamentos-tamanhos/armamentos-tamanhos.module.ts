import { Module } from '@nestjs/common';
import { ArmamentosTamanhosService } from './armamentos-tamanhos.service';
import { ArmamentosTamanhosController } from './armamentos-tamanhos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmamentoTamanho } from './armamento-tamanho.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArmamentoTamanho]), LogsModule],
  providers: [ArmamentosTamanhosService],
  controllers: [ArmamentosTamanhosController],
  exports: [ArmamentosTamanhosService],
})
export class ArmamentosTamanhosModule {}
