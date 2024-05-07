import { Module } from '@nestjs/common';
import { SetoresService } from './setores.service';
import { SetoresController } from './setores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setor } from './setor.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Setor]),
    LogsModule
  ],
  providers: [SetoresService],
  controllers: [SetoresController],
  exports: [SetoresService]
})
export class SetoresModule {}
