import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import UsersService  from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validate(auth: AuthDto): Promise<any> {
    const user = await this.validateUser(auth);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async validateUser(auth: AuthDto): Promise<any> {
    const user = await this.getAuthenticatedUser(auth.email,auth.password);
    return user;
  }

  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      const a = await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
   
  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );

    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
  
  async register(register: RegisterDto) {
    const hashedPassword = await bcrypt.hash(register.password, 10);
    try {
      const createdUser = await this.usersService.createUser({
        ...register,
        password: hashedPassword
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}