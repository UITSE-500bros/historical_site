import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiConsumes } from '@nestjs/swagger';

@ApiConsumes('multipart/form-data')
export class CreateMuseumDto {
    @ApiProperty({
        description: 'The name of the museum',
        example: 'National Museum of History',
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    museumName: string;

    @ApiProperty({
        description: 'Museum image file to upload',
        type: 'string',
        format: 'binary',
        required: true
    })
    museumImage: any;

    @ApiProperty({
        description: 'The physical address of the museum',
        example: '123 Museum Street, City, Country',
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    museumAddress: string;

    @ApiProperty({
        description: 'The contact phone number of the museum',
        example: '+1234567890',
        type: 'string'
    })
    @IsString()
    @IsNotEmpty()
    museumPhone: string;

    @ApiProperty({
        description: 'The contact email of the museum',
        example: 'contact@museum.com',
        type: 'string'
    })
    @IsEmail()
    @IsNotEmpty()
    museumEmail: string;
}
