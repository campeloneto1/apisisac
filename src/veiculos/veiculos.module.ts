import { Module, forwardRef } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { VeiculosController } from './veiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculo } from './veiculo.entity';
import { VeiculosOficinasModule } from 'src/veiculos-oficinas/veiculos-oficinas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Veiculo]),
    forwardRef(() => VeiculosOficinasModule)
  ],
  providers: [VeiculosService],
  controllers: [VeiculosController],
  exports: [VeiculosService]
})
export class VeiculosModule {}
