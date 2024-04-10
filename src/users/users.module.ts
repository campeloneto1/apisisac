import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UtilitiesModule } from 'src/utilities/utilities.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UtilitiesModule
  ],
    controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}
