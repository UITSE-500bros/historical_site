import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../../articles/entities/article.entity';

export class Period {
  @ApiProperty({
    description: 'The unique identifier of the period',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  period_id: string;

  @ApiProperty({
    description: 'The name of the period',
    example: 'Renaissance'
  })
  period_name: string;

  @ApiProperty({
    description: 'The start year of the period',
    example: 1300
  })
  start_year: number;

  @ApiProperty({
    description: 'The end year of the period',
    example: 1600
  })
  end_year: number;

  @ApiProperty({
    description: 'The date when the period was created',
    example: '2025-04-07T12:00:00Z'
  })
  created_at: Date;

  @ApiProperty({
    description: 'The date when the period was last updated',
    example: '2025-04-07T12:00:00Z'
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Articles related to this period',
    type: [Article],
    required: false
  })
  articles?: Article[];
}
