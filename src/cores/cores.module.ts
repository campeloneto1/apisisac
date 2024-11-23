import { Module } from '@nestjs/common';
import { CoresService } from './cores.service';
import { CoresController } from './cores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cor } from './cor.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cor]), LogsModule],
  providers: [CoresService],
  controllers: [CoresController],
  exports: [CoresService],
})
export class CoresModule {}
