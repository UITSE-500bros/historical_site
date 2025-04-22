import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateTopicDto {
    @ApiProperty({
        description: 'The name of the topic',
        example: 'Art History',
        minLength: 1,
        required: false
    })
    @IsOptional()
    @IsString()
    @MinLength(1)
    topicName?: string;

    @ApiProperty({
        description: 'The image URL of the topic',
        example: 'https://example.com/topic.jpg',
        required: false
    })
    @IsOptional()
    @IsString()
    topicImage?: string;
}
