import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }
}
