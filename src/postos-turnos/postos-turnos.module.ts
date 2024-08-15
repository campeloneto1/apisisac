import { Module } from '@nestjs/common';
import { PostosTurnosService } from './postos-turnos.service';
import { PostosTurnosController } from './postos-turnos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostoTurno } from './posto-turno.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostoTurno]),
    LogsModule
  ],
  providers: [PostosTurnosService],
  controllers: [PostosTurnosController],
  exports: [PostosTurnosService]
})
export class PostosTurnosModule {}
