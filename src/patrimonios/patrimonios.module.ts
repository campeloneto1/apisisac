import { Module } from '@nestjs/common';
import { PatrimoniosService } from './patrimonios.service';
import { PatrimoniosController } from './patrimonios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patrimonio } from './patrimonio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patrimonio])],
  providers: [PatrimoniosService],
  controllers: [PatrimoniosController],
  exports: [PatrimoniosService]
})
export class PatrimoniosModule {}
