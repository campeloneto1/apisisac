import { Module } from '@nestjs/common';
import { ModelosService } from './modelos.service';
import { ModelosController } from './modelos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modelo } from './modelo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Modelo])],
  providers: [ModelosService],
  controllers: [ModelosController],
  exports: [ModelosService]
})
export class ModelosModule {}
