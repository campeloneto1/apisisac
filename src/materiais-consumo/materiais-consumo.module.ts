import { Module } from '@nestjs/common';
import { MateriaisConsumoService } from './materiais-consumo.service';
import { MateriaisConsumoController } from './materiais-consumo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialConsumo } from './material-consumo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialConsumo]),
    LogsModule
  ],
  providers: [MateriaisConsumoService],
  controllers: [MateriaisConsumoController],
  exports: [MateriaisConsumoService]
})
export class MateriaisConsumoModule {}
