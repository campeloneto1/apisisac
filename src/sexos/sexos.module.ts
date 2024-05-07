import { Module } from '@nestjs/common';
import { SexosService } from './sexos.service';
import { SexosController } from './sexos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sexo } from './sexo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sexo]),
    LogsModule
  ],
  providers: [SexosService],
  controllers: [SexosController],
  exports: [SexosService]
})
export class SexosModule {}
