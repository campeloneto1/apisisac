import { Module } from '@nestjs/common';
import { MateriaisConsumoEntradasService } from './materiais-consumo-entradas.service';
import { MateriaisConsumoEntradasController } from './materiais-consumo-entradas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialConsumoEntrada } from './material-consumo-entrada.entity';
import { LogsModule } from 'src/logs/logs.module';
import { MateriaisConsumoEntradasItensModule } from 'src/materiais-consumo-entradas-itens/materiais-consumo-entradas-itens.module';
import { MateriaisConsumoModule } from 'src/materiais-consumo/materiais-consumo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialConsumoEntrada]),
    MateriaisConsumoEntradasItensModule,
    MateriaisConsumoModule,
    LogsModule
  ],
  providers: [MateriaisConsumoEntradasService],
  controllers: [MateriaisConsumoEntradasController],
  exports: [MateriaisConsumoEntradasService]
})
export class MateriaisConsumoEntradasModule {}
