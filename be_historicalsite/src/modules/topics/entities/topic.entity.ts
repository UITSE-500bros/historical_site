import { ApiProperty } from "@nestjs/swagger";

export class Topic {
    @ApiProperty({
        description: 'The unique identifier of the topic',
        example: '123e4567-e89b-12d3-a456-426614174000',
        format: 'uuid'
    })
    topicId: string;

    @ApiProperty({
        description: 'The name of the topic',
        example: 'Art History',
        minLength: 1
    })
    topicName: string;

    @ApiProperty({
        description: 'The image URL of the topic',
        example: 'https://example.com/topic.jpg',
    })
    topicImage: string;

    @ApiProperty({
        description: 'The event articles related to this topic',
        type: [Object],
        required: false
    })
    eventArticles?: any[];

    @ApiProperty({
        description: 'The timestamp when the topic was created',
        example: '2025-04-18T09:03:39Z',
        format: 'date-time'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The timestamp when the topic was last updated',
        example: '2025-04-18T09:03:39Z',
        format: 'date-time'
    })
    updatedAt: Date;
}
