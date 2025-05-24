import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdatePeriodDto {
    @ApiProperty({
        description: 'The name of the historical period',
        example: 'Renaissance Period',
        required: false
    })
    @IsString()
    periodName?: string;

    @ApiProperty({
        description: 'The image URL of the historical period',
        example: 'https://example.com/image.jpg',
        required: false
    })
    @IsString()
    periodImage?: string;

    @ApiProperty({
        description: 'The start year of the period',
        example: 1300,
        required: false,
        type: Number
    })
    @IsNumber()
    @Min(-5000)
    @Max(9999)
    startYear?: number;

    @ApiProperty({
        description: 'The end year of the period',
        example: 1600,
        required: false,
        type: Number
    })
    @IsNumber()
    @Min(-5000)
    @Max(9999)
    endYear?: number;
}
