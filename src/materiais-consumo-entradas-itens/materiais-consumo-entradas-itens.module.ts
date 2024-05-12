import { Module } from '@nestjs/common';
import { MateriaisConsumoEntradasItensService } from './materiais-consumo-entradas-itens.service';
import { MateriaisConsumoEntradasItensController } from './materiais-consumo-entradas-itens.controller';
import { MaterialConsumoEntradaItem } from './material-consumo-entrada-item.entity';
import { LogsModule } from 'src/logs/logs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaisConsumoModule } from 'src/materiais-consumo/materiais-consumo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialConsumoEntradaItem]),
    MateriaisConsumoModule,
    LogsModule
  ],
  providers: [MateriaisConsumoEntradasItensService],
  controllers: [MateriaisConsumoEntradasItensController],
  exports: [MateriaisConsumoEntradasItensService]
})
export class MateriaisConsumoEntradasItensModule {}
