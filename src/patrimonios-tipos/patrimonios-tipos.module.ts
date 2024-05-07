import { Module } from '@nestjs/common';
import { PatrimoniosTiposService } from './patrimonios-tipos.service';
import { PatrimoniosTiposController } from './patrimonios-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatrimonioTipo } from './patrimonio-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatrimonioTipo]),
    LogsModule
  ],
  providers: [PatrimoniosTiposService],
  controllers: [PatrimoniosTiposController],
  exports: [PatrimoniosTiposService]
})
export class PatrimoniosTiposModule {}
