import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagEntity } from './tag.entity';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiOperation({ summary: 'Returns a list of tags' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of tags',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async findAll(): Promise<TagEntity[]> {
    return await this.tagService.findAll();
  }
}
