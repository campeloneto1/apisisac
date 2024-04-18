import { Module } from '@nestjs/common';
import { PublicacoesTiposService } from './publicacoes-tipos.service';
import { PublicacoesTiposController } from './publicacoes-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicacaoTipo } from './publicacao-tipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicacaoTipo])],
  providers: [PublicacoesTiposService],
  controllers: [PublicacoesTiposController],
  exports: [PublicacoesTiposService]
})
export class PublicacoesTiposModule {}
