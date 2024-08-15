import { Module } from '@nestjs/common';
import { EscalasService } from './escalas.service';
import { EscalasController } from './escalas.controller';

@Module({
  providers: [EscalasService],
  controllers: [EscalasController]
})
export class EscalasModule {}
