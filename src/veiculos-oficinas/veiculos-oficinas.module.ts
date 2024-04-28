import { Module, forwardRef } from '@nestjs/common';
import { VeiculosOficinasService } from './veiculos-oficinas.service';
import { VeiculosOficinasController } from './veiculos-oficinas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoOficina } from './veiculo-oficina.entity';
import { VeiculosModule } from 'src/veiculos/veiculos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VeiculoOficina]),
    forwardRef(() => VeiculosModule)
  ],
  providers: [VeiculosOficinasService],
  controllers: [VeiculosOficinasController],
  exports: [VeiculosOficinasService]
})
export class VeiculosOficinasModule {}
