import { Module } from '@nestjs/common';
import { VeiculosPoliciaisService } from './veiculos-policiais.service';
import { VeiculosPoliciaisController } from './veiculos-policiais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoPolicial } from './veiculo-policial.entity';
import { VeiculosModule } from 'src/veiculos/veiculos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VeiculoPolicial]),
    VeiculosModule
  ],
  providers: [VeiculosPoliciaisService],
  controllers: [VeiculosPoliciaisController],
  exports: [VeiculosPoliciaisService]
})
export class VeiculosPoliciaisModule {}
