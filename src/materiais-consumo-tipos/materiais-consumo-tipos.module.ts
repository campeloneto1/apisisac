import { Module } from '@nestjs/common';
import { MateriaisConsumoTiposService } from './materiais-consumo-tipos.service';
import { MateriaisConsumoTiposController } from './materiais-consumo-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialConsumoTipo } from './material-consumo-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialConsumoTipo]), LogsModule],
  providers: [MateriaisConsumoTiposService],
  controllers: [MateriaisConsumoTiposController],
  exports: [MateriaisConsumoTiposService],
})
export class MateriaisConsumoTiposModule {}
