import { Module } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CidadesController } from './cidades.controller';
import { Cidade } from './cidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cidade])],
  providers: [CidadesService],
  controllers: [CidadesController],
  exports: [CidadesService]
})
export class CidadesModule {}
