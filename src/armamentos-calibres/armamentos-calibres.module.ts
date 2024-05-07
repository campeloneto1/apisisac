import { Module } from '@nestjs/common';
import { ArmamentosCalibresService } from './armamentos-calibres.service';
import { ArmamentosCalibresController } from './armamentos-calibres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmamentoCalibre } from './armamento-calibre.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArmamentoCalibre]),
    LogsModule
  ],
  providers: [ArmamentosCalibresService],
  controllers: [ArmamentosCalibresController],
  exports: [ArmamentosCalibresService]
})
export class ArmamentosCalibresModule {}
