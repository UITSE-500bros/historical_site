import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTopicDto {
    @ApiProperty({
        description: 'The name of the topic',
        example: 'Art History',
        minLength: 1
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    topicName: string;

    @ApiProperty({
        description: 'The image URL of the topic',
        example: 'https://example.com/topic.jpg',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    topicImage: string;
}
