import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateImageDto {
  @ApiProperty({ description: 'The ID of the content this image belongs to', example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsUUID()
  @IsOptional()
  contentId?: string;

  @ApiProperty({ description: 'The source URL of the image', example: 'https://example.com/images/colosseum.jpg', required: false })
  @IsString()
  @IsOptional()
  src?: string;

  @ApiProperty({ description: 'The alt text for the image', example: 'The Colosseum in Rome', required: false })
  @IsString()
  @IsOptional()
  alt?: string;

  @ApiProperty({ description: 'The caption of the image', example: 'The Colosseum, an ancient amphitheater in Rome', required: false })
  @IsString()
  @IsOptional()
  caption?: string;

  @ApiProperty({ description: 'The width of the image in pixels', example: 800, required: false })
  @IsInt()
  @IsOptional()
  width?: number;

  @ApiProperty({ description: 'The height of the image in pixels', example: 600, required: false })
  @IsInt()
  @IsOptional()
  height?: number;
} 