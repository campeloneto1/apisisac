import { Module } from '@nestjs/common';
import { VeiculosTiposService } from './veiculos-tipos.service';
import { VeiculosTiposController } from './veiculos-tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoTipo } from './veiculo-tipo.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([VeiculoTipo]), LogsModule],
  providers: [VeiculosTiposService],
  controllers: [VeiculosTiposController],
  exports: [VeiculosTiposService],
})
export class VeiculosTiposModule {}
