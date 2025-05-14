import { ApiProperty } from "@nestjs/swagger";

export class Period {
    @ApiProperty({
        description: 'The unique identifier for the period',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        format: 'uuid'
    })
    periodId: string;

    @ApiProperty({
        description: 'The name of the historical period',
        example: 'Renaissance Period',
        minLength: 1
    })
    periodName: string;

    @ApiProperty({
        description: 'The image URL of the historical period',
        example: 'https://example.com/image.jpg',
    })
    periodImage: string;

    @ApiProperty({
        description: 'The event articles related to this period',
        type: [Object],
        required: false
    })
    eventArticles?: any[];

    @ApiProperty({
        description: 'The start year of the period',
        example: 1300,
        type: Number
    })
    startYear: number;

    @ApiProperty({
        description: 'The end year of the period',
        example: 1600,
        type: Number
    })
    endYear: number;

    @ApiProperty({
        description: 'The timestamp when the period was created',
        example: '2025-04-18T09:03:39Z',
        format: 'date-time'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The timestamp when the period was last updated',
        example: '2025-04-18T09:03:39Z',
        format: 'date-time'
    })
    updatedAt: Date;
}
