import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { Estado } from './estado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  providers: [EstadosService],
  controllers: [EstadosController],
  exports: [EstadosService]
})
export class EstadosModule {}
