import { Module } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { ServicosController } from './servicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';
import { Servico } from './servico.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servico]),
    LogsModule
  ],
  providers: [ServicosService],
  controllers: [ServicosController],
  exports: [ServicosService]
})
export class ServicosModule {}
