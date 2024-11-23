import { Module } from '@nestjs/common';
import { MateriaisService } from './materiais.service';
import { MateriaisController } from './materiais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './material.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Material]), LogsModule],
  providers: [MateriaisService],
  controllers: [MateriaisController],
  exports: [MateriaisService],
})
export class MateriaisModule {}
