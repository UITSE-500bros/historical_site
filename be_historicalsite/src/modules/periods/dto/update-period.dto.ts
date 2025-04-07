import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePeriodDto } from './create-period.dto';

export class UpdatePeriodDto extends PartialType(CreatePeriodDto) {
  @ApiProperty({
    description: 'The unique identifier of the period',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsUUID()
  @IsOptional()
  period_id?: string;

  @ApiProperty({
    description: 'The name of the period',
    example: 'Renaissance',
    required: false
  })
  @IsString()
  @IsOptional()
  period_name?: string;

  @ApiProperty({
    description: 'The start year of the period',
    example: 1300,
    required: false
  })
  @IsNumber()
  @IsOptional()
  start_year?: number;

  @ApiProperty({
    description: 'The end year of the period',
    example: 1600,
    required: false
  })
  @IsNumber()
  @IsOptional()
  end_year?: number;
}
