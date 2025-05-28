import { ApiProperty } from '@nestjs/swagger';

export class EventArticle {
  @ApiProperty({ description: 'The unique identifier of the article', example: '123e4567-e89b-12d3-a456-426614174000' })
  articleId: string;

  @ApiProperty({ description: 'The period ID this event belongs to', example: '123e4567-e89b-12d3-a456-426614174000' })
  periodId: string;

  @ApiProperty({ description: 'The topic ID this event belongs to', example: '123e4567-e89b-12d3-a456-426614174000' })
  topicId: string;

}