import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiConsumes } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateMuseumDto } from './create-museum.dto';

@ApiConsumes('multipart/form-data')
export class UpdateMuseumDto extends PartialType(CreateMuseumDto) {
  // All properties are optional due to PartialType
  
  @ApiProperty({
    description: 'The name of the museum',
    example: 'National Museum of History',
    type: 'string',
    required: false
  })
  @IsString()
  @IsOptional()
  museumName?: string;

  @ApiProperty({
    description: 'Museum image file to upload',
    type: 'string',
    format: 'binary',
    required: false
  })
  @IsOptional()
  museumImage?: any;

  @ApiProperty({
    description: 'The physical address of the museum',
    example: '123 Museum Street, City, Country',
    type: 'string',
    required: false
  })
  @IsString()
  @IsOptional()
  museumAddress?: string;

  @ApiProperty({
    description: 'The contact phone number of the museum',
    example: '+1234567890',
    type: 'string',
    required: false
  })
  @IsString()
  @IsOptional()
  museumPhone?: string;

  @ApiProperty({
    description: 'The contact email of the museum',
    example: 'contact@museum.com',
    type: 'string',
    required: false
  })
  @IsEmail()
  @IsOptional()
  museumEmail?: string;
}
