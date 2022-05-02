import { hash, compare } from 'bcrypt';
import { CreateUserDto } from './dto';
import { SALT } from './constants';

export class UserMapper {
  public mapResponseUser(response: any): any {
    // const { email, token, username, bio, image } = response;
    return {
      user: { ...response },
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
