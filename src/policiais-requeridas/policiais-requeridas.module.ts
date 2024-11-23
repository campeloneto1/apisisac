import { Module } from '@nestjs/common';
import { PoliciaisRequeridasService } from './policiais-requeridas.service';
import { PoliciaisRequeridasController } from './policiais-requeridas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';
import { PolicialRequerida } from './policial-requerida.entity';
import { PoliciaisModule } from 'src/policiais/policiais.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PolicialRequerida]),
    LogsModule,
    PoliciaisModule,
  ],
  providers: [PoliciaisRequeridasService],
  controllers: [PoliciaisRequeridasController],
  exports: [PoliciaisRequeridasService],
})
export class PoliciaisRequeridasModule {}
