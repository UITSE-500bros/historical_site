import { ApiProperty } from '@nestjs/swagger';
import { Period } from '../../periods/entities/period.entity';
import { Topic } from '../../topics/entities/topic.entity';

export class Article {
  @ApiProperty({
    description: 'The unique identifier of the article',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  article_id: string;

  @ApiProperty({
    description: 'The name of the article',
    example: 'World War II'
  })
  article_name: string;

  @ApiProperty({
    description: 'The content of the article',
    example: 'World War II was a global war that lasted from 1939 to 1945...'
  })
  article_content: string;

  @ApiProperty({
    description: 'The type of the article',
    example: 'Event',
    enum: ['Person', 'Event'],
    default: 'Event'
  })
  article_type: string;

  @ApiProperty({
    description: 'The date when the article was created',
    example: '2025-04-07T12:00:00Z'
  })
  created_at: Date;

  @ApiProperty({
    description: 'The date when the article was last updated',
    example: '2025-04-07T12:00:00Z'
  })
  updated_at: Date;

  @ApiProperty({
    description: 'List of images for the article',
    example: { images: ['image1.jpg', 'image2.jpg'] },
    required: false
  })
  images_list?: Record<string, any>;

  @ApiProperty({
    description: 'The ID of the period this article belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  period_id: string;

  @ApiProperty({
    description: 'The ID of the topic this article belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  topic_id: string;

  @ApiProperty({
    description: 'The period this article belongs to',
    type: () => Period
  })
  period: Period;

  @ApiProperty({
    description: 'The topic this article belongs to',
    type: () => Topic
  })
  topic: Topic;
}
