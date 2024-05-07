import { Module } from '@nestjs/common';
import { PublicacoesTiposService } from './publicacoes-tipos.service';
import { PublicacoesTiposController } from './publicacoes-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicacaoTipo } from './publicacao-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicacaoTipo]),
    LogsModule
  ],
  providers: [PublicacoesTiposService],
  controllers: [PublicacoesTiposController],
  exports: [PublicacoesTiposService]
})
export class PublicacoesTiposModule {}
