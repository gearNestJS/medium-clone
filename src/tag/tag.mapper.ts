import { TagEntity } from './tag.entity';
import { TagsInterface } from './tag.interface';

export class TagMapper {
  public mapTags(tagEntities: TagEntity[]): TagsInterface {
    return {
      tags: tagEntities.map((tag: TagEntity) => tag.name),
    };
  }
}
