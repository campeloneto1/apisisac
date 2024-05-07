import { Module } from '@nestjs/common';
import { OficinasService } from './oficinas.service';
import { OficinasController } from './oficinas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oficina } from './oficina.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Oficina]),
    LogsModule
  ],
  providers: [OficinasService],
  controllers: [OficinasController],
  exports: [OficinasService]
})
export class OficinasModule {}
