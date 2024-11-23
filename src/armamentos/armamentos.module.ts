import { Module } from '@nestjs/common';
import { ArmamentosService } from './armamentos.service';
import { ArmamentosController } from './armamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Armamento } from './armamento.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Armamento]), LogsModule],
  providers: [ArmamentosService],
  controllers: [ArmamentosController],
  exports: [ArmamentosService],
})
export class ArmamentosModule {}
