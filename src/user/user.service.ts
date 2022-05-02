import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserMapper } from './user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userMapper: UserMapper,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.userMapper.mapRequestUser(createUserDto);
    return this.userRepository.create(user);
  }
}
