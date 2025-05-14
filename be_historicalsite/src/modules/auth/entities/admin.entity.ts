import { ApiProperty } from '@nestjs/swagger';

export class Admin {
  @ApiProperty({
    description: 'The unique identifier of the admin',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  adminId: string;

  @ApiProperty({
    description: 'Admin first name',
    example: 'John'
  })
  adminFisrtName: string;

  @ApiProperty({
    description: 'Admin last name',
    example: 'Doe'
  })
  adminLastName: string;

  @ApiProperty({
    description: 'Admin email address',
    example: 'admin@example.com'
  })
  adminEmail: string;

  @ApiProperty({
    description: 'Admin avatar URL',
    example: 'https://example.com/avatar.jpg'
  })
  adminAvatar: string;

  @ApiProperty({
    description: 'Admin phone number',
    example: '+1234567890'
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-01-01T00:00:00Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-01-01T00:00:00Z'
  })
  updatedAt: Date;
}
