import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto, ResponseUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Post('/create')
  public async createUser(
    @Body('user')
    createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    const createUser = await this.userService.createUser(createUserDto);
    const { id, password, ...rest } = createUser;
    return {
      user: {
        ...rest,
      },
    };
  }
}
