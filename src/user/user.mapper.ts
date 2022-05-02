import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto, ResponseUserDto } from './dto';
import { PRIVATE_KEY, SALT } from './constants';
import { ResponseUserInterface } from './interface';

export class UserMapper {
  public mapResponseUser(
    responseUserDto: ResponseUserDto,
  ): ResponseUserInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, ...rest } = responseUserDto;
    const { username, email } = rest;
    const token: string = sign({ id, username, email }, PRIVATE_KEY);

    return {
      user: { ...rest, token },
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
