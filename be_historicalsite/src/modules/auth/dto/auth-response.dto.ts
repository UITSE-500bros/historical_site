import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '../entities/admin.entity';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string;

  @ApiProperty({
    description: 'Admin user information',
    type: Admin
  })
  admin: Admin;
}
