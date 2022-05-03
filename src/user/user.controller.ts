import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserMapper } from './user.mapper';
import { ResponseUserInterface } from './interface';
import { UserEntity } from './entity/user.entity';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create new user' })
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<ResponseUserInterface> {
    const createUser: UserEntity = await this.userService.createUser(
      createUserDto,
    );
    return this.userMapper.mapResponseUser(createUser);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Login user' })
  async loginUser(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<ResponseUserInterface> {
    const loginUser: UserEntity = await this.userService.loginUser(
      loginUserDto,
    );
    return this.userMapper.mapResponseUser(loginUser);
  }
}
