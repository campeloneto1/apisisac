import { Module } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CidadesController } from './cidades.controller';
import { Cidade } from './cidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cidade]), LogsModule],
  providers: [CidadesService],
  controllers: [CidadesController],
  exports: [CidadesService],
})
export class CidadesModule {}
