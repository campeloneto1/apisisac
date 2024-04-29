import { Module } from '@nestjs/common';
import { PatrimoniosTiposService } from './patrimonios-tipos.service';
import { PatrimoniosTiposController } from './patrimonios-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatrimonioTipo } from './patrimonio-tipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PatrimonioTipo])],
  providers: [PatrimoniosTiposService],
  controllers: [PatrimoniosTiposController],
  exports: [PatrimoniosTiposService]
})
export class PatrimoniosTiposModule {}
