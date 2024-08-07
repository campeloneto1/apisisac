import { Module } from '@nestjs/common';
import { FuncoesService } from './funcoes.service';
import { FuncoesController } from './funcoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';
import { Funcao } from './funcao.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcao]),
    LogsModule
  ],
  providers: [FuncoesService],
  controllers: [FuncoesController],
  exports: [FuncoesService]
})
export class FuncoesModule {}
