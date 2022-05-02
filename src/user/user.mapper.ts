import { hash, compare } from 'bcrypt';
import { CreateUserDto, ResponseUserDto } from './dto';
import { SALT } from './constants';
import { ResponseUserInterface } from './interface';

export class UserMapper {
  public mapResponseUser(
    responseUserDto: ResponseUserDto,
  ): ResponseUserInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, ...rest } = responseUserDto;

    return {
      user: { ...rest },
    };
  }

  public async mapRequestUser(user: CreateUserDto): Promise<CreateUserDto> {
    const { password } = user;

    return {
      ...user,
      password: await hash(password, SALT),
    };
  }
}
