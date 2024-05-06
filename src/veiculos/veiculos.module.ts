import { Module, forwardRef } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { VeiculosController } from './veiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './veiculo.entity';
import { VeiculosOficinasModule } from 'src/veiculos-oficinas/veiculos-oficinas.module';
import { VeiculosPoliciaisModule } from 'src/veiculos-policiais/veiculos-policiais.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Veiculo]),
    LogsModule,
    forwardRef(() => VeiculosPoliciaisModule),
    forwardRef(() => VeiculosOficinasModule),
  ],
  providers: [VeiculosService],
  controllers: [VeiculosController],
  exports: [VeiculosService]
})
export class VeiculosModule {}
