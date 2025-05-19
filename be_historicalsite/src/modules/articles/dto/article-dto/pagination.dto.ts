import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ArticleType } from '../../entities/article-type.entity';

export class PaginationDto {
  @ApiProperty({
    description: 'Page number (1-based)',
    example: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;
  
  @ApiProperty({
    description: 'Filter by article type (EVENT or PERSON)',
    enum: ArticleType,
    required: false,
  })
  @IsOptional()
  @IsEnum(ArticleType)
  articleType?: ArticleType;
} 