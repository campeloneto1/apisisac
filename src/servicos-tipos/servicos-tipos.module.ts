import { Module } from '@nestjs/common';
import { ServicosTiposService } from './servicos-tipos.service';
import { ServicosTiposController } from './servicos-tipos.controller';
import { ServicoTipo } from './servico-tipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([ServicoTipo]), LogsModule],
  providers: [ServicosTiposService],
  controllers: [ServicosTiposController],
  exports: [ServicosTiposService],
})
export class ServicosTiposModule {}
