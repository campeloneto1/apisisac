import { Module } from '@nestjs/common';
import { PoliciaisFeriasService } from './policiais-ferias.service';
import { PoliciaisFeriasController } from './policiais-ferias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicialFerias } from './policial-ferias.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PolicialFerias]),
  ],
  providers: [PoliciaisFeriasService],
  controllers: [PoliciaisFeriasController],
  exports: [PoliciaisFeriasService]
})
export class PoliciaisFeriasModule {}
