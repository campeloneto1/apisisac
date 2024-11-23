import { Module } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './marca.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Marca]), LogsModule],
  providers: [MarcasService],
  controllers: [MarcasController],
  exports: [MarcasService],
})
export class MarcasModule {}
