import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty({ description: 'Partial fields of the article to update' })
  article: Partial<CreateArticleDto>;
}
