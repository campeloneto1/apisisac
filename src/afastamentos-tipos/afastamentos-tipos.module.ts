import { Module } from '@nestjs/common';
import { AfastamentosTiposService } from './afastamentos-tipos.service';
import { AfastamentosTiposController } from './afastamentos-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfastamentoTipo } from './afastamento-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([AfastamentoTipo]), LogsModule],
  providers: [AfastamentosTiposService],
  controllers: [AfastamentosTiposController],
  exports: [AfastamentosTiposService],
})
export class AfastamentosTiposModule {}
