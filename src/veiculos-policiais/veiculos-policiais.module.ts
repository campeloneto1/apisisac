import { Module, forwardRef } from '@nestjs/common';
import { VeiculosPoliciaisService } from './veiculos-policiais.service';
import { VeiculosPoliciaisController } from './veiculos-policiais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoPolicial } from './veiculo-policial.entity';
import { VeiculosModule } from 'src/veiculos/veiculos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VeiculoPolicial]),
    forwardRef(() => VeiculosModule)
    
  ],
  providers: [VeiculosPoliciaisService],
  controllers: [VeiculosPoliciaisController],
  exports: [VeiculosPoliciaisService]
})
export class VeiculosPoliciaisModule {}
