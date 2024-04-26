import { Module } from '@nestjs/common';
import { OficinasService } from './oficinas.service';
import { OficinasController } from './oficinas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oficina } from './oficina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oficina])],
  providers: [OficinasService],
  controllers: [OficinasController],
  exports: [OficinasService]
})
export class OficinasModule {}
