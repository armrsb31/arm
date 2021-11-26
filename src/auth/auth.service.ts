import { Injectable, UnauthorizedException } from '@nestjs/common';
import UsersService  from '../users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(auth: AuthDto): Promise<any> {
    const user = await this.usersService.findOne(auth.email);
    if (user && user.password === auth.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validate(auth: AuthDto): Promise<any> {
    const user = await this.validateUser(auth);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}