import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreatePeriodDto {
    @ApiProperty({
        description: 'The name of the historical period',
        example: 'Renaissance Period',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    periodName: string;

    @ApiProperty({
        description: 'The image URL of the historical period',
        example: 'https://example.com/image.jpg',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    periodImage: string;

    @ApiProperty({
        description: 'The start year of the period',
        example: 1300,
        required: true,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(-5000) // Assuming we want to limit to reasonable historical dates
    @Max(9999)
    startYear: number;

    @ApiProperty({
        description: 'The end year of the period',
        example: 1600,
        required: true,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(-5000)
    @Max(9999)
    endYear: number;
}
