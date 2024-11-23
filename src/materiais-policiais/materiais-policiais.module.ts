import { Module } from '@nestjs/common';
import { MateriaisPoliciaisService } from './materiais-policiais.service';
import { MateriaisPoliciaisController } from './materiais-policiais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialPolicial } from './material-policial.entity';
import { LogsModule } from 'src/logs/logs.module';
import { MateriaisModule } from 'src/materiais/materiais.module';
import { MateriaisPoliciaisItensModule } from 'src/materiais-policiais-itens/materiais-policiais-itens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialPolicial]),
    MateriaisModule,
    MateriaisPoliciaisItensModule,
    LogsModule,
  ],
  providers: [MateriaisPoliciaisService],
  controllers: [MateriaisPoliciaisController],
  exports: [MateriaisPoliciaisService],
})
export class MateriaisPoliciaisModule {}
