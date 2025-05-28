import { ApiProperty } from '@nestjs/swagger';
import { Image } from './image.entity';

export class Content {
  @ApiProperty({ description: 'The unique identifier of the content', example: '123e4567-e89b-12d3-a456-426614174000' })
  contentId: string;

  @ApiProperty({ description: 'The name of the content', example: 'Introduction' })
  contentName: string;

  @ApiProperty({ description: 'The ID of the article this content belongs to', example: '123e4567-e89b-12d3-a456-426614174000' })
  articleId: string;

  @ApiProperty({ description: 'The ID of the parent content (if any)', example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  parentId?: string;

  @ApiProperty({ description: 'The actual content text', example: 'This is the main content...' })
  content: string;

  @ApiProperty({ description: 'List of image IDs associated with this content', example: '["123e4567-e89b-12d3-a456-426614174000"]' })
  imagesId: any;



  @ApiProperty({ description: 'The parent content (if any)', type: () => Content, required: false })
  parent?: Content;

  @ApiProperty({ description: 'Child content items', type: [Content] })
  children: Content[];

  @ApiProperty({ description: 'Images associated with this content', type: [Image] })
  images: Image[];
}