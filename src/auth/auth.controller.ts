import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import RegisterDto from './dto/register.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ){}

  @Post('register')
  async createUser(@Body() register: RegisterDto){
    return await this.authService.register(register);
  }

  @Post('login')
  async login(@Body() auth: AuthDto) {
    return await this.authService.validate(auth);
  }

}