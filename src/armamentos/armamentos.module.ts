import { Module } from '@nestjs/common';
import { ArmamentosService } from './armamentos.service';
import { ArmamentosController } from './armamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Armamento } from './armamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Armamento])],
  providers: [ArmamentosService],
  controllers: [ArmamentosController],
  exports: [ArmamentosService]
})
export class ArmamentosModule {}
