import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateContentDto {
  @ApiProperty({ description: 'The name of the content', example: 'Introduction', required: false })
  @IsString()
  @IsOptional()
  contentName?: string;

  @ApiProperty({ description: 'The ID of the parent content (if any)', example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiProperty({ description: 'The actual content text', example: 'This is the main content...', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'List of image IDs associated with this content', example: '["123e4567-e89b-12d3-a456-426614174000"]', required: false })
  @IsOptional()
  imagesId?: any;
} 