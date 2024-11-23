import { Module } from '@nestjs/common';
import { DocumentosTiposService } from './documentos-tipos.service';
import { DocumentosTiposController } from './documentos-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentoTipo } from './documento-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentoTipo]), LogsModule],
  providers: [DocumentosTiposService],
  controllers: [DocumentosTiposController],
  exports: [DocumentosTiposService],
})
export class DocumentosTiposModule {}
