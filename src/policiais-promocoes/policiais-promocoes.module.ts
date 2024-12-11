import { Module } from '@nestjs/common';
import { PoliciaisPromocoesService } from './policiais-promocoes.service';
import { PoliciaisPromocoesController } from './policiais-promocoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicialPromocao } from './policial-promocao.entity';
import { LogsModule } from 'src/logs/logs.module';
import { PoliciaisModule } from 'src/policiais/policiais.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PolicialPromocao]),
    LogsModule,
    PoliciaisModule,
  ],
  providers: [PoliciaisPromocoesService],
  controllers: [PoliciaisPromocoesController],
  exports: [PoliciaisPromocoesService],
})
export class PoliciaisPromocoesModule {}
