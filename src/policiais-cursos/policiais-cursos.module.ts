import { Module } from '@nestjs/common';
import { PoliciaisCursosService } from './policiais-cursos.service';
import { PoliciaisCursosController } from './policiais-cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicialCurso } from './policial-curso.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PolicialCurso]),
    LogsModule
  ],
  providers: [PoliciaisCursosService],
  controllers: [PoliciaisCursosController],
  exports: [PoliciaisCursosService]
})
export class PoliciaisCursosModule {}
