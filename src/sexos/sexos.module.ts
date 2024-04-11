import { Module } from '@nestjs/common';
import { SexosService } from './sexos.service';
import { SexosController } from './sexos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sexo } from './sexo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sexo])],
  providers: [SexosService],
  controllers: [SexosController],
  exports: [SexosService]
})
export class SexosModule {}
