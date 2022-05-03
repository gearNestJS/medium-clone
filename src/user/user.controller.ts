import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
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
  @ApiOperation({ summary: 'Create new user' })
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<ResponseUserInterface> {
    const responseUserDto: UserEntity = await this.userService.createUser(
      createUserDto,
    );
    return this.userMapper.mapResponseUser(responseUserDto);
  }
}
