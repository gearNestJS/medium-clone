import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto } from './dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserMapper } from './user.mapper';
import { ResponseUserInterface } from './interface';

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
  ): Promise<ResponseUserInterface> {
    const responseUserDto: ResponseUserDto = await this.userService.createUser(
      createUserDto,
    );
    return this.userMapper.mapResponseUser(responseUserDto);
  }
}
