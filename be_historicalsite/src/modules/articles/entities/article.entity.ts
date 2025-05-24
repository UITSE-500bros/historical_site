import { ApiProperty } from '@nestjs/swagger';
import { Content } from './content.entity';
import { PersonArticle } from './personArticle.entity';
import { EventArticle } from './eventArticle.entity';

export class Article {
  @ApiProperty({ description: 'The unique identifier of the article', example: '123e4567-e89b-12d3-a456-426614174000' })
  articleId: string;

  @ApiProperty({ description: 'The type of the article (EVENT or PERSON)' })
  articleType: string;

  @ApiProperty({ description: 'The name of the article', example: 'The History of Ancient Rome' })
  articleName: string;

  @ApiProperty({ 
    description: 'List of article contents in JSON format', 
    example: '[{"contentId": "123", "content": "Introduction"}]'
  })
  articleContentList: any;


  @ApiProperty({ description: 'The person article data (if article type is PERSON)', type: () => PersonArticle, required: false })
  personArticle?: PersonArticle;

  @ApiProperty({ description: 'The event article data (if article type is EVENT)', type: () => EventArticle, required: false })
  eventArticle?: EventArticle;

  @ApiProperty({ description: 'The contents of the article', type: [Content] })
  contents: Content[];
}
