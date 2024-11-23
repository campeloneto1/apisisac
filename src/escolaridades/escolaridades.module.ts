import { Module } from '@nestjs/common';
import { EscolaridadesService } from './escolaridades.service';
import { EscolaridadesController } from './escolaridades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';
import { Escolaridade } from './escolaridade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escolaridade]), LogsModule],
  providers: [EscolaridadesService],
  controllers: [EscolaridadesController],
  exports: [EscolaridadesService],
})
export class EscolaridadesModule {}
