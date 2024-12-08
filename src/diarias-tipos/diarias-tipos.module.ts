import { Module } from '@nestjs/common';
import { DiariasTiposService } from './diarias-tipos.service';
import { DiariasTiposController } from './diarias-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaTipo } from './diaria-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([DiariaTipo]), LogsModule],
  providers: [DiariasTiposService],
  controllers: [DiariasTiposController],
  exports: [DiariasTiposService],
})
export class DiariasTiposModule {}
