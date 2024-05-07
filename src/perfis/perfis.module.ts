import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfisController } from './perfis.controller';
import { PerfisService } from './perfis.service';
import { Perfil } from './perfil.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Perfil]),
    LogsModule
  ],
  controllers: [PerfisController],
  providers: [PerfisService],
  exports: [PerfisService]
})
export class PerfisModule {}
