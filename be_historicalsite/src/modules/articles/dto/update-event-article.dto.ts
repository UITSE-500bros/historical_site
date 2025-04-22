import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { UpdateArticleDto } from './article-dto/update-article.dto';

export class UpdateEventArticleDto {
  @ApiProperty({ 
    description: 'The period ID this event belongs to', 
    example: '123e4567-e89b-12d3-a456-426614174000', 
    required: false,
    format: 'uuid'
  })
  @IsUUID('4')
  @IsOptional()
  periodId?: string;

  @ApiProperty({ 
    description: 'The topic ID this event belongs to', 
    example: '123e4567-e89b-12d3-a456-426614174000', 
    required: false,
    format: 'uuid'
  })
  @IsUUID('4')
  @IsOptional()
  topicId?: string;

  // Base article information
  @ApiProperty({ description: 'The updated base article information', type: UpdateArticleDto, required: false })
  article?: UpdateArticleDto;
} 