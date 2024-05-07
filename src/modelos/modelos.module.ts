import { Module } from '@nestjs/common';
import { ModelosService } from './modelos.service';
import { ModelosController } from './modelos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modelo } from './modelo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modelo]),
    LogsModule
  ],
  providers: [ModelosService],
  controllers: [ModelosController],
  exports: [ModelosService]
})
export class ModelosModule {}
