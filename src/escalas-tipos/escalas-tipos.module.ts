import { Module } from '@nestjs/common';
import { EscalasTiposService } from './escalas-tipos.service';
import { EscalasTiposController } from './escalas-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscalaTipo } from './escala-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EscalaTipo]),
    LogsModule
  ],
  providers: [EscalasTiposService],
  controllers: [EscalasTiposController],
  exports: [EscalasTiposService]
})
export class EscalasTiposModule {}
