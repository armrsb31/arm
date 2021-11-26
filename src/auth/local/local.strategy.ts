import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(auth: AuthDto): Promise<any> {
    console.log('2');
    const user = await this.authService.validateUser(auth);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}