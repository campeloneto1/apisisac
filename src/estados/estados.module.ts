import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { Estado } from './estado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Estado]), LogsModule],
  providers: [EstadosService],
  controllers: [EstadosController],
  exports: [EstadosService],
})
export class EstadosModule {}
