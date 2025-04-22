import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateArticleDto } from './article-dto/create-article.dto';

export class CreatePersonArticleDto {
  @ApiProperty({ description: 'The name of the person', example: 'Julius Caesar' })
  @IsString()
  @IsNotEmpty()
  personName: string;

  @ApiProperty({ description: 'The birth year of the person', example: 100 })
  @IsInt()
  @IsNotEmpty()
  birthYear: number;

  @ApiProperty({ description: 'The death year of the person', example: 44 })
  @IsInt()
  @IsNotEmpty()
  deathYear: number;

  @ApiProperty({ description: 'The nationality of the person', example: 'Roman' })
  @IsString()
  @IsNotEmpty()
  nationality: string;

  // Base article information
  @ApiProperty({ type: CreateArticleDto })
  article: CreateArticleDto;
} 