import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { LogsModule } from 'src/logs/logs.module';
import { UsersSubunidadesModule } from 'src/users-subunidades/users-subunidades.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersSubunidadesModule,
    UtilitiesModule,
    LogsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
