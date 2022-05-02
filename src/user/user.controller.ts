import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserMapper } from './user.mapper';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Post('users')
  @ApiOperation({ summary: 'Create new user' })
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<CreateUserDto> {
    const user = await this.userService.createUser(createUserDto);
    return this.userMapper.mapResponseUser(user);
  }
}
