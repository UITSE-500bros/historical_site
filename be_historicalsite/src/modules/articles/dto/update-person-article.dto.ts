import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateArticleDto } from './article-dto/create-article.dto';
import { UpdateArticleDto } from './article-dto/update-article.dto';

export class UpdatePersonArticleDto {
  @ApiProperty({ description: 'The name of the person', example: 'Julius Caesar', required: false })
  @IsString()
  @IsOptional()
  personName?: string;

  @ApiProperty({ description: 'The avatar URL of the person', example: 'https://example.com/avatar.jpg', required: false })
  @IsString()
  @IsOptional()
  personAvatar?: string;

  @ApiProperty({ description: 'The birth year of the person', example: 100, required: false })
  @IsInt()
  @IsOptional()
  birthYear?: number;

  @ApiProperty({ description: 'The death year of the person', example: 44, required: false })
  @IsInt()
  @IsOptional()
  deathYear?: number;

  @ApiProperty({ description: 'The nationality of the person', example: 'Roman', required: false })
  @IsString()
  @IsOptional()
  nationality?: string;

  // Base article information
  @ApiProperty({ description: 'The updated base article information', type: UpdateArticleDto, required: false })
  article?: UpdateArticleDto;
} 