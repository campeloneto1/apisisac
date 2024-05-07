import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './curso.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso]),
    LogsModule
  ],
  providers: [CursosService],
  controllers: [CursosController],
  exports: [CursosService]
})
export class CursosModule {}
