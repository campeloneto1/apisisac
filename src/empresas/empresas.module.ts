import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './empresa.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empresa]),
    LogsModule
  ],
  providers: [EmpresasService],
  controllers: [EmpresasController],
  exports: [EmpresasService]
})
export class EmpresasModule {}
