import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curso])],
  providers: [CursosService],
  controllers: [CursosController],
  exports: [CursosService]
})
export class CursosModule {}
