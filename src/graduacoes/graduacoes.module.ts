import { Module } from '@nestjs/common';
import { GraduacoesService } from './graduacoes.service';
import { GraduacoesController } from './graduacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Graduacao } from './graduacao.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Graduacao]),
    LogsModule
  ],
  providers: [GraduacoesService],
  controllers: [GraduacoesController],
  exports: [GraduacoesService]
})
export class GraduacoesModule {}
