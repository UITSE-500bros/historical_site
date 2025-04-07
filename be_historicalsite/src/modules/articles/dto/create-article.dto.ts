import { IsNotEmpty, IsString, IsUUID, IsOptional, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum ArticleType {
  Person = 'Person',
  Event = 'Event',
}

export class CreateArticleDto {
  @ApiProperty({
    description: 'The name of the article',
    example: 'World War II'
  })
  @IsNotEmpty()
  @IsString()
  article_name: string;

  @ApiProperty({
    description: 'The content of the article',
    example: 'World War II was a global war that lasted from 1939 to 1945...'
  })
  @IsNotEmpty()
  @IsString()
  article_content: string;

  @ApiProperty({
    description: 'The type of the article',
    example: 'Event',
    enum: ArticleType,
    default: 'Event'
  })
  @IsOptional()
  @IsEnum(ArticleType)
  article_type?: string;

  @ApiProperty({
    description: 'List of images for the article',
    example: { images: ['image1.jpg', 'image2.jpg'] },
    required: false
  })
  @IsOptional()
  @IsObject()
  images_list?: Record<string, any>;

  @ApiProperty({
    description: 'The ID of the period this article belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  period_id: string;

  @ApiProperty({
    description: 'The ID of the topic this article belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  topic_id: string;
}
