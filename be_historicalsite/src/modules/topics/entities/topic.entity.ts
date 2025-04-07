import { Article } from '../../articles/entities/article.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Topic {
  @ApiProperty({
    description: 'The unique identifier of the topic',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  topic_id: string;

  @ApiProperty({
    description: 'The name of the topic',
    example: 'World War II'
  })
  topic_name: string;

  @ApiProperty({
    description: 'The date when the topic was created',
    example: '2025-04-07T12:00:00Z'
  })
  created_at: Date;

  @ApiProperty({
    description: 'The date when the topic was last updated',
    example: '2025-04-07T12:00:00Z'
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Articles related to this topic',
    type: [Article],
    required: false
  })
  articles?: Article[];
}
