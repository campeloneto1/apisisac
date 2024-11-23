import { Module } from '@nestjs/common';
import { UsersSubunidadesService } from './users-subunidades.service';
import { UsersSubunidadesController } from './users-subunidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubunidade } from './user-subunidade.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserSubunidade]), LogsModule],
  providers: [UsersSubunidadesService],
  controllers: [UsersSubunidadesController],
  exports: [UsersSubunidadesService],
})
export class UsersSubunidadesModule {}
