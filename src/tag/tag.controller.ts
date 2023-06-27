import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAll(): Promise<{ tags: string[] }> {
    const tags: TagEntity[] = await this.tagService.getAll();
    return {
      tags: tags.map((tag: TagEntity) => tag.name),
    };
  }
}
