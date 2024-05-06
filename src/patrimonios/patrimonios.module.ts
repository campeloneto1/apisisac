import { Module } from '@nestjs/common';
import { PatrimoniosService } from './patrimonios.service';
import { PatrimoniosController } from './patrimonios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patrimonio } from './patrimonio.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patrimonio]),
    LogsModule
  ],
  providers: [PatrimoniosService],
  controllers: [PatrimoniosController],
  exports: [PatrimoniosService]
})
export class PatrimoniosModule {}
