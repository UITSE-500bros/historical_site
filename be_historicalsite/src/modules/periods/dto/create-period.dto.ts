import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePeriodDto {
  @ApiProperty({
    description: 'The name of the period',
    example: 'Renaissance'
  })
  @IsNotEmpty()
  @IsString()
  period_name: string;

  @ApiProperty({
    description: 'The start year of the period',
    example: 1300
  })
  @IsNotEmpty()
  @IsNumber()
  start_year: number;

  @ApiProperty({
    description: 'The end year of the period',
    example: 1600
  })
  @IsNotEmpty()
  @IsNumber()
  end_year: number;
}
