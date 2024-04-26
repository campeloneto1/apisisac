import { Module } from '@nestjs/common';
import { VeiculosTiposService } from './veiculos-tipos.service';
import { VeiculosTiposController } from './veiculos-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoTipo } from './veiculo-tipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoTipo])],
  providers: [VeiculosTiposService],
  controllers: [VeiculosTiposController],
  exports: [VeiculosTiposService]
})
export class VeiculosTiposModule {}
