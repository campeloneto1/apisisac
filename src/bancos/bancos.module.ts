import { Module } from '@nestjs/common';
import { BancosService } from './bancos.service';
import { BancosController } from './bancos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banco } from './banco.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banco]),
    LogsModule
  ],
  providers: [BancosService],
  controllers: [BancosController],
  exports: [BancosService]
})
export class BancosModule {}
