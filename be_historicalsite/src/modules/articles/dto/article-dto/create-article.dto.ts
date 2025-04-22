import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum ArticleType {
  EVENT = 'EVENT',
  PERSON = 'PERSON'
}

export class CreateArticleDto {
  @ApiProperty({ 
    description: 'The type of the article', 
    enum: ArticleType,
    example: 'EVENT'
  })
  @IsEnum(ArticleType)
  @IsNotEmpty()
  articleType: ArticleType;

  @ApiProperty({ description: 'The name of the article', example: 'World War II' })
  @IsString()
  @IsNotEmpty()
  articleName: string;

  @ApiProperty({ 
    description: 'List of article contents in JSON format', 
    example: '[{"contentId": "123", "content": "Introduction"}]',
    required: false
  })
  @IsOptional()
  articleContentList?: any;
}
