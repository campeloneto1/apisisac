import { Module } from '@nestjs/common';
import { PoliciaisService } from './policiais.service';
import { PoliciaisController } from './policiais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policial } from './policial.entity';
import { UsersModule } from 'src/users/users.module';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { LogsModule } from 'src/logs/logs.module';
import { UsersSubunidadesModule } from 'src/users-subunidades/users-subunidades.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Policial]),
    UsersModule,
    UsersSubunidadesModule,
    UtilitiesModule,
    LogsModule,
  ],
  providers: [PoliciaisService],
  controllers: [PoliciaisController],
  exports: [PoliciaisService],
})
export class PoliciaisModule {}
