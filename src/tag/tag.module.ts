import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { TagMapper } from './tag.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [TagService, TagMapper],
  controllers: [TagController],
})
export class TagModule {}
