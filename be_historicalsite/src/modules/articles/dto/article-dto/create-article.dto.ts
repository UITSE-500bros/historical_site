import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateContentDto } from '../content-dto/create-content.dto';

export class CreateArticleDto {
  @ApiProperty({ 
    description: 'The type of the article', 
    enum: ['EVENT', 'PERSON'],
    example: 'EVENT'
  })
  @IsNotEmpty()
  @IsEnum(['EVENT', 'PERSON'])
  articleType: 'EVENT' | 'PERSON';

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
