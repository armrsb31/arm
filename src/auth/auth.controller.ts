import { Controller, Post, Body } from '@nestjs/common';
import UsersService from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import RegisterDto from './dto/register.dto';


@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ){}

  @Post('register')
  async createUser(@Body() register: RegisterDto){
    return this.usersService.createUser(register);
  }

  @Post('login')
  async login(@Body() auth: AuthDto) {
    const res = await this.authService.validate(auth);
    return res;
  }

}