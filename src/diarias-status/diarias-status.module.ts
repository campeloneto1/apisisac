import { Module } from '@nestjs/common';
import { DiariasStatusService } from './diarias-status.service';
import { DiariasStatusController } from './diarias-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaStatus } from './diaria-status.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([DiariaStatus]), LogsModule],
  providers: [DiariasStatusService],
  controllers: [DiariasStatusController],
  exports: [DiariasStatusService],
})
export class DiariasStatusModule {}
