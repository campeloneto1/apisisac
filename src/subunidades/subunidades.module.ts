import { Module } from '@nestjs/common';
import { SubunidadesService } from './subunidades.service';
import { SubunidadesController } from './subunidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subunidade } from './subunidade.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subunidade]), LogsModule],
  providers: [SubunidadesService],
  controllers: [SubunidadesController],
  exports: [SubunidadesService],
})
export class SubunidadesModule {}
