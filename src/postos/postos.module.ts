import { Module } from '@nestjs/common';
import { PostosController } from './postos.controller';
import { PostosService } from './postos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsModule } from 'src/logs/logs.module';
import { Posto } from './posto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posto]),
    LogsModule
  ],
  controllers: [PostosController],
  providers: [PostosService],
  exports: [PostosService]
})
export class PostosModule {}
