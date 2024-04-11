import { Module } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { UnidadesController } from './unidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidade } from './unidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unidade])],
  providers: [UnidadesService],
  controllers: [UnidadesController],
  exports: [UnidadesService]
})
export class UnidadesModule {}
