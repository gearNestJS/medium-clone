import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from './dto';
import { PRIVATE_KEY, SALT } from './constants';
import { ResponseUserInterface } from './interface';
import { UserEntity } from './entity/user.entity';

export class UserMapper {
  public mapResponseUser(createUser: UserEntity): ResponseUserInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, ...rest } = createUser;
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

  public async mapResponseUserPassword(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await compare(plainPassword, hashPassword);
  }
}
