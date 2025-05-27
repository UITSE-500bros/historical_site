import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { $Enums } from '@prisma/client';
import { Content } from '../../entities/content.entity';
import { CreateContentDto } from '../content-dto/create-content.dto';

export class CreateArticleDto {
  @ApiProperty({ 
    description: 'The type of the article', 
    enum: $Enums.ArticleType,
    example: $Enums.ArticleType.EVENT
  })
  @IsNotEmpty()
  @IsEnum($Enums.ArticleType)
  articleType: $Enums.ArticleType;

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
  contents: CreateContentDto[];
}
