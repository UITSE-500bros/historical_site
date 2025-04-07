import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsUUID, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

enum ArticleType {
  Person = 'Person',
  Event = 'Event',
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty({
    description: 'The unique identifier of the article',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsUUID()
  @IsOptional()
  article_id?: string;

  @ApiProperty({
    description: 'The name of the article',
    example: 'World War II',
    required: false
  })
  @IsString()
  @IsOptional()
  article_name?: string;

  @ApiProperty({
    description: 'The content of the article',
    example: 'World War II was a global war that lasted from 1939 to 1945...',
    required: false
  })
  @IsString()
  @IsOptional()
  article_content?: string;

  @ApiProperty({
    description: 'The type of the article',
    example: 'Event',
    enum: ArticleType,
    required: false
  })
  @IsEnum(ArticleType)
  @IsOptional()
  article_type?: string;

  @ApiProperty({
    description: 'List of images for the article',
    example: { images: ['image1.jpg', 'image2.jpg'] },
    required: false
  })
  @IsObject()
  @IsOptional()
  images_list?: Record<string, any>;

  @ApiProperty({
    description: 'The ID of the period this article belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsUUID()
  @IsOptional()
  period_id?: string;

  @ApiProperty({
    description: 'The ID of the topic this article belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsUUID()
  @IsOptional()
  topic_id?: string;
}
