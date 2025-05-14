import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateArticleDto } from './article-dto/create-article.dto';

export class CreateEventArticleDto {
  @ApiProperty({ 
    description: 'The period ID this event belongs to', 
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @IsUUID('4')
  @IsNotEmpty()
  periodId: string;

  @ApiProperty({ 
    description: 'The topic ID this event belongs to', 
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @IsUUID('4')
  @IsNotEmpty()
  topicId: string;

  // Base article information
  @ApiProperty({ type: CreateArticleDto })
  article: CreateArticleDto;
} 