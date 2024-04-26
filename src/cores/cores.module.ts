import { Module } from '@nestjs/common';
import { CoresService } from './cores.service';
import { CoresController } from './cores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cor } from './cor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cor])],
  providers: [CoresService],
  controllers: [CoresController],
  exports: [CoresService]
})
export class CoresModule {}
