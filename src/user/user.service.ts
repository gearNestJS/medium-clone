import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, username } = createUserDto;
    const userByEmail: UserEntity = await this.userRepository.findOne({
      email,
    });
    const userByUsername: UserEntity = await this.userRepository.findOne({
      username,
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'User already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user: CreateUserDto = await this.userMapper.mapRequestUser(
      createUserDto,
    );
    return await this.userRepository.save(user);
  }
}
