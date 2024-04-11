import { Module } from '@nestjs/common';
import { PoliciaisService } from './policiais.service';
import { PoliciaisController } from './policiais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policial } from './policial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Policial])],
  providers: [PoliciaisService],
  controllers: [PoliciaisController],
  exports: [PoliciaisService]
})
export class PoliciaisModule {}
