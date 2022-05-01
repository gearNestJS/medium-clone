import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  findAll(): string[] {
    return this.tagService.findAll();
  }
}
