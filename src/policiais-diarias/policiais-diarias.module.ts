import { Module } from '@nestjs/common';
import { PoliciaisDiariasService } from './policiais-diarias.service';
import { PoliciaisDiariasController } from './policiais-diarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicialDiaria } from './policial-diaria.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([PolicialDiaria]), LogsModule],
  providers: [PoliciaisDiariasService],
  controllers: [PoliciaisDiariasController],
  exports: [PoliciaisDiariasService],
})
export class PoliciaisDiariasModule {}
