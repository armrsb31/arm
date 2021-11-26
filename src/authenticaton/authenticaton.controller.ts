import { Body, Controller, Post } from '@nestjs/common';
import RegisterDto from './dto/register.dto';

@Controller('authenticaton')
export class AuthenticatonController {
    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        //return this.authenticationService.register(registrationData);
    }
}
