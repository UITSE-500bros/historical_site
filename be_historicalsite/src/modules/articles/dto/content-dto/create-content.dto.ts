import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Image } from '../../entities/image.entity';

export class CreateContentDto {
  @ApiProperty({
    description: 'The name of the content',
    example: 'Introduction',
  })
  @IsString()
  @IsNotEmpty()
  contentName: string;

  @ApiProperty({
    description: 'The ID of the article this content belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  articleId: string;

  // @ApiProperty({
  //   description: 'The ID of the parent content (if any)',
  //   example: '123e4567-e89b-12d3-a456-426614174000',
  //   required: false
  // })
  // @IsUUID()
  // @IsOptional()
  // parentId?: string;

  @ApiProperty({
    description: 'The actual content text',
    example: 'This is the main content...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'List of images associated with this content',
    type: [Image],
    required: false,
    example: [
      {
        imageId: '123e4567-e89b-12d3-a456-426614174000',
        contentId: '123e4567-e89b-12d3-a456-426614174001',
        src: 'https://example.com/image.jpg',
        alt: 'An example image',
        caption: 'This is an example image caption.',
        width: 800,
        height: 600,
      },
    ],
  })
  @IsOptional()
  images?: Image[];

  @ApiProperty({
    description: 'List of child contents',
    type: [CreateContentDto],
    required: false,
    example: [
      {
        contentName: 'Child Content',
        articleId: '123e4567-e89b-12d3-a456-426614174000',
        content: 'This is a child content.',
        images: [],
      },
    ],
  })
  children: CreateContentDto[] = [];
}
