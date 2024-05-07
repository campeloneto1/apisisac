import { Module } from '@nestjs/common';
import { MateriaisConsumoSaidasService } from './materiais-consumo-saidas.service';
import { MateriaisConsumoSaidasController } from './materiais-consumo-saidas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialConsumoSaida } from './material-consumo-saida.entity';
import { LogsModule } from 'src/logs/logs.module';
import { MateriaisConsumoModule } from 'src/materiais-consumo/materiais-consumo.module';
import { MateriaisConsumoSaidasItensModule } from 'src/materiais-consumo-saidas-itens/materiais-consumo-saidas-itens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialConsumoSaida]),
    MateriaisConsumoModule,
    MateriaisConsumoSaidasItensModule,
    LogsModule
  ],
  providers: [MateriaisConsumoSaidasService],
  controllers: [MateriaisConsumoSaidasController],
  exports: [MateriaisConsumoSaidasService]
})
export class MateriaisConsumoSaidasModule {}
