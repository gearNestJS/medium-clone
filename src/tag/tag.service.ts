import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  public getAll(): string[] {
    return ['vuejs', 'angularjs', 'reactjs'];
  }
}
