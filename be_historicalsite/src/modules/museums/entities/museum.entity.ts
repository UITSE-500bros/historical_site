import { ApiProperty } from '@nestjs/swagger';

export class Museum {
  @ApiProperty({
    description: 'The unique identifier of the museum',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  museumId: string;

  @ApiProperty({
    description: 'The name of the museum',
    example: 'National Museum of History'
  })
  museumName: string;

  @ApiProperty({
    description: 'The image URL of the museum',
    example: 'https://example.com/museum-image.jpg'
  })
  museumImage: string;

  @ApiProperty({
    description: 'The physical address of the museum',
    example: '123 Museum Street, City, Country'
  })
  museumAddress: string;

  @ApiProperty({
    description: 'The contact phone number of the museum',
    example: '+1234567890'
  })
  museumPhone: string;

  @ApiProperty({
    description: 'The contact email of the museum',
    example: 'contact@museum.com'
  })
  museumEmail: string;

  @ApiProperty({
    description: 'The date when the museum was created',
    example: '2025-05-28T14:22:20Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the museum was last updated',
    example: '2025-05-28T14:22:20Z'
  })
  updatedAt: Date;
}
