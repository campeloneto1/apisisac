import { Module } from '@nestjs/common';
import { MateriaisPoliciaisItensService } from './materiais-policiais-itens.service';
import { MateriaisPoliciaisItensController } from './materiais-policiais-itens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialPolicialItem } from './material-policial-item.entity';
import { LogsModule } from 'src/logs/logs.module';
import { MateriaisModule } from 'src/materiais/materiais.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialPolicialItem]),
    MateriaisModule,
    LogsModule,
  ],
  providers: [MateriaisPoliciaisItensService],
  controllers: [MateriaisPoliciaisItensController],
  exports: [MateriaisPoliciaisItensService],
})
export class MateriaisPoliciaisItensModule {}
