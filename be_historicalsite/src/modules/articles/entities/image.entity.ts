import { ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty({ description: 'The unique identifier of the image', example: '123e4567-e89b-12d3-a456-426614174000' })
  imageId: string;

  @ApiProperty({ description: 'The ID of the content this image belongs to', example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  contentId?: string;

  @ApiProperty({ description: 'The source URL of the image', example: 'https://example.com/images/colosseum.jpg' })
  src: string;

  @ApiProperty({ description: 'The alt text for the image', example: 'The Colosseum in Rome', required: false })
  alt?: string;

  @ApiProperty({ description: 'The caption of the image', example: 'The Colosseum, an ancient amphitheater in Rome', required: false })
  caption?: string;

  @ApiProperty({ description: 'The width of the image in pixels', example: 800, required: false })
  width?: number;

  @ApiProperty({ description: 'The height of the image in pixels', example: 600, required: false })
  height?: number;

  @ApiProperty({ description: 'The creation timestamp of the image' })
  createdAt: Date;

  @ApiProperty({ description: 'The last update timestamp of the image' })
  updatedAt: Date;
}