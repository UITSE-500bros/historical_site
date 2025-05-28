import { ApiProperty } from '@nestjs/swagger';

export class PersonArticle {
  @ApiProperty({ description: 'The unique identifier of the article', example: '123e4567-e89b-12d3-a456-426614174000' })
  articleId: string;

  @ApiProperty({ description: 'The name of the person', example: 'Julius Caesar' })
  personName: string;

  @ApiProperty({ description: 'The birth year of the person', example: 100 })
  birthYear: number;

  @ApiProperty({ description: 'The death year of the person', example: 44 })
  deathYear: number;

  @ApiProperty({ description: 'The nationality of the person', example: 'Roman' })
  nationality: string;

}