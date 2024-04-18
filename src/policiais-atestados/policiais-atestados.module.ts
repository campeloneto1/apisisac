import { Module } from '@nestjs/common';
import { PoliciaisAtestadosController } from './policiais-atestados.controller';
import { PoliciaisAtestadosService } from './policiais-atestados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicialAtestado } from './policial-atestado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PolicialAtestado]),
  ],
  controllers: [PoliciaisAtestadosController],
  providers: [PoliciaisAtestadosService],
  exports: [PoliciaisAtestadosService]
})
export class PoliciaisAtestadosModule {}
