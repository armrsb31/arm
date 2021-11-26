import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import UsersService from 'src/users/users.service';

@Module({
  imports: [UsersModule,PassportModule,TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersService,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
