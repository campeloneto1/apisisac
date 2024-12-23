import { Module } from '@nestjs/common';
import { PoliciaisPublicacoesService } from './policiais-publicacoes.service';
import { PoliciaisPublicacoesController } from './policiais-publicacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicialPublicacao } from './policial-publicacao.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([PolicialPublicacao]), LogsModule],
  providers: [PoliciaisPublicacoesService],
  controllers: [PoliciaisPublicacoesController],
  exports: [PoliciaisPublicacoesService],
})
export class PoliciaisPublicacoesModule {}
