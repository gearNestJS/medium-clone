import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from './dto';
import { PRIVATE_KEY, SALT } from './constants';
import { ResponseUserInterface } from './interface';
import { UserEntity } from './entity/user.entity';

export class UserMapper {
  public mapResponseUser(responseUserDto: UserEntity): ResponseUserInterface {
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
