import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RegisterDto from './dto/register.dto';
import { User } from './user.entity';

@Injectable()
export default class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOne(email: string): Promise<any> {
    return this.usersRepository.findOne({where:{email:email}});
  }
 
  async createUser(register: RegisterDto) {
    const newUser = await this.usersRepository.create(register);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}