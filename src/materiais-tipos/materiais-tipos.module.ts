import { Module } from '@nestjs/common';
import { MateriaisTiposService } from './materiais-tipos.service';
import { MateriaisTiposController } from './materiais-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialTipo } from './material-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialTipo]), LogsModule],
  providers: [MateriaisTiposService],
  controllers: [MateriaisTiposController],
  exports: [MateriaisTiposService],
})
export class MateriaisTiposModule {}
