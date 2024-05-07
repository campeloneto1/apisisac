import { Module } from '@nestjs/common';
import { MateriaisConsumoSaidasItensService } from './materiais-consumo-saidas-itens.service';
import { MateriaisConsumoSaidasItensController } from './materiais-consumo-saidas-itens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialConsumoSaidaItem } from './material-consumo-saida-item.entity';
import { LogsModule } from 'src/logs/logs.module';
import { MateriaisConsumoModule } from 'src/materiais-consumo/materiais-consumo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialConsumoSaidaItem]),
    MateriaisConsumoModule,
    LogsModule
  ],
  providers: [MateriaisConsumoSaidasItensService],
  controllers: [MateriaisConsumoSaidasItensController],
  exports: [MateriaisConsumoSaidasItensService]
})
export class MateriaisConsumoSaidasItensModule {}
