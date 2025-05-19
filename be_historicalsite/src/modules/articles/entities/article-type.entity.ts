import { ApiProperty } from '@nestjs/swagger';

export enum ArticleType {
  EVENT = 'EVENT',
  PERSON = 'PERSON'
}

export class ArticleTypeEntity {
  @ApiProperty({ 
    description: 'The type of the article',
    enum: ArticleType,
    example: 'EVENT'
  })
  type: ArticleType;
} 