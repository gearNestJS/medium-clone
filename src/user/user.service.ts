import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto } from './dto';
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

  async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const user: CreateUserDto = await this.userMapper.mapRequestUser(
      createUserDto,
    );
    const savedUser: ResponseUserDto = await this.userRepository.save(user);
    if (!savedUser) {
      new HttpException('error', HttpStatus.NOT_IMPLEMENTED);
    }
    return savedUser;
  }
}
