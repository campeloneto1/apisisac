import { Module } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { UtilitiesController } from './utilities.controller';

@Module({
  providers: [UtilitiesService],
  exports: [UtilitiesService],
  controllers: [UtilitiesController],
})
export class UtilitiesModule {}
