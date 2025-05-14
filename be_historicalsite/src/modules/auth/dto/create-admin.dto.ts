import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Admin first name',
    example: 'John',
    default: 'Admin'
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Admin last name',
    example: 'Doe',
    default: 'User'
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Admin email address',
    example: 'admin@example.com',
    default: 'admin@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Admin password',
    example: 'StrongPassword123',
    default: 'Admin@123',
    minLength: 8
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Admin phone number',
    example: '+1234567890',
    default: '+1234567890'
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Admin avatar URL',
    example: 'https://example.com/avatar.jpg',
    default: 'https://example.com/default-avatar.jpg',
    required: false
  })
  @IsString()
  avatar?: string;
}
